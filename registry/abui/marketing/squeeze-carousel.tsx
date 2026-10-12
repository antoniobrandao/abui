"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * SqueezeCarousel
 *
 * A "what's happening" style news carousel: one wide active card followed by progressively
 * narrower companions that stretch on hover and slide into place when you navigate.
 *
 * Desktop (>= sm): the image strip is a single <canvas>. Every card is clipped to a rounded
 * rectangle and its image is cover-fitted into a fixed 16:9 box centred on the card, so a
 * card looks squeezed rather than scaled. Card widths come from flex fractions of the width
 * left over after the primary 16:9 card, and every width, gap and offset is tweened with an
 * ease-out-expo curve when the active index changes.
 *
 * Mobile (< sm): a native scroll-snap list of cards with scale, parallax and fade driven by
 * scroll progress through CSS custom properties.
 *
 * Composition:
 *
 *   <SqueezeCarousel items={items}>
 *     <SqueezeCarouselHeader>
 *       <SqueezeCarouselHeading>
 *         <SqueezeCarouselTitle>What's happening</SqueezeCarouselTitle>
 *         <SqueezeCarouselDescription>See the latest from us.</SqueezeCarouselDescription>
 *       </SqueezeCarouselHeading>
 *       <SqueezeCarouselControls>
 *         <SqueezeCarouselPrevious />
 *         <SqueezeCarouselNext />
 *       </SqueezeCarouselControls>
 *     </SqueezeCarouselHeader>
 *     <SqueezeCarouselCanvas />
 *     <SqueezeCarouselDetails>{renderCopy}</SqueezeCarouselDetails>
 *     <SqueezeCarouselMobileList>{renderCopy}</SqueezeCarouselMobileList>
 *   </SqueezeCarousel>
 */

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

export interface SqueezeCarouselItem {
  /** Stable identifier, used as the React key. */
  id: string
  /**
   * Plain-text name of the item. Announced to screen readers ("Item 2 of 8: …") and used as
   * the default `alt` text of the mobile image.
   */
  title: string
  /** Image drawn on the desktop canvas. A 16:9 image of at least 1632×918 is recommended. */
  src: string
  /** Image used by the mobile card list. Defaults to `src`. A 336:350 crop is recommended. */
  mobileSrc?: string
  /** Alternative text for the mobile image. Defaults to `title`. Pass "" for decorative images. */
  alt?: string
  /**
   * Horizontal offset in CSS pixels applied to the image while its card is collapsed. Use it
   * to keep the focal point of the image inside the narrow column. Positive values move the
   * image to the left. Default: 0.
   */
  collapsedOffsetX?: number
}

export type SqueezeCarouselCrossOrigin = "anonymous" | "use-credentials"

export interface SqueezeCarouselNavigateOptions {
  /** Move keyboard focus to the newly active item's action once it becomes active. */
  focus?: boolean
}

export type SqueezeCarouselRenderItem = (item: SqueezeCarouselItem, index: number) => React.ReactNode

/* -------------------------------------------------------------------------------------------------
 * Canvas engine
 *
 * Framework-agnostic class that owns the <canvas>. It keeps a list of "cards" (one per visible
 * column), lays them out from a set of flex fractions, and tweens every card between layouts.
 * -----------------------------------------------------------------------------------------------*/

const SQUEEZE = {
  /** Gap before a collapsed 8px sliver. */
  smallCardGap: 8,
  /** Gap before one of the four main columns. */
  largeCardGap: 16,
  /** Width of a collapsed sliver. */
  smallCardWidth: 8,
  /** Extra width given to a hovered sliver. */
  smallCardHoverOffset: 3,
  /** Share of the leftover width taken by columns 0..3 at rest. Column 0 adds this to its 16:9 base. */
  flex: [-0.06, 0.61, 0.3, 0.15],
  /** Shares used for the columns that are not hovered while another one is. */
  flexSqueezed: [-0.12, 0.59, 0.28, 0.13],
  /** Shares used for the hovered column. */
  flexStretched: [0, 0.71, 0.4, 0.25],
  /** Tween duration in ms. */
  duration: 1000,
  /** Tween duration in ms when the user prefers reduced motion. */
  reducedMotionDuration: 200,
  /** Default corner radius of every card. */
  borderRadius: 6,
  /** The primary column is sized from the canvas height at this ratio; images are cover-fitted into it. */
  primaryAspectRatio: 16 / 9,
  /** Maximum device pixel ratio used for the backing store. */
  maxPixelRatio: 2,
} as const

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const lerp = (from: number, to: number, t: number) => from + (to - from) * t
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
const mod = (value: number, length: number) => ((value % length) + length) % length

interface EngineCard {
  itemIndex: number
  image: HTMLImageElement
  x: number
  width: number
  leftGap: number
  collapsedOffsetX: number
  columnIndex: number
  startWidth?: number
  targetWidth?: number
  startLeftGap?: number
  targetLeftGap?: number
  startCollapsedOffsetX?: number
  targetCollapsedOffsetX?: number
}

interface SqueezeCanvasEngineOptions {
  canvas: HTMLCanvasElement
  items: SqueezeCarouselItem[]
  /** Item shown in the primary column on first paint. */
  initialIndex?: number
  /** Called when a non-primary column is clicked, with the number of steps to advance. */
  onColumnClick: (steps: number) => void
  prefersReducedMotion?: boolean
  borderRadius?: number
  crossOrigin?: SqueezeCarouselCrossOrigin
}

export class SqueezeCanvasEngine {
  /** Index of the item currently (or about to be) shown in the primary column. */
  activeIndex: number

  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly dpr: number
  private readonly items: SqueezeCarouselItem[]
  private readonly images: HTMLImageElement[]
  private readonly collapsedOffsets: number[]
  private readonly onColumnClick: (steps: number) => void
  private readonly prefersReducedMotion: boolean
  private readonly borderRadius: number
  private readonly animationDuration: number
  private readonly resizeObserver: ResizeObserver | null

  private cards: EngineCard[] = []
  private numSmallCards = 3
  private visibleCardsCount = 7
  private totalGap = 0

  private canvasWidth = 0
  private canvasHeight = 0
  private primaryBaseWidth = 0
  private totalFlexWidth = 0
  private imageWidth = 0

  private flex: number[] = [...SQUEEZE.flex]
  private hoveredColumn = -1
  private columnIndexOffset = 0

  private cardsOffsetX = 0
  private startCardsOffsetX = 0
  private targetCardsOffsetX = 0
  private flexWidthOffset = 0
  private startFlexWidthOffset = 0
  private targetFlexWidthOffset = 0

  private animationStartAt = 0
  private animationFrame = 0
  private resizeFrame = 0
  private disposed = false

  constructor({
    canvas,
    items,
    initialIndex = 0,
    onColumnClick,
    prefersReducedMotion = false,
    borderRadius = SQUEEZE.borderRadius,
    crossOrigin,
  }: SqueezeCanvasEngineOptions) {
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("SqueezeCanvasEngine: 2D canvas context is not available")

    this.canvas = canvas
    this.ctx = ctx
    this.dpr = Math.min(window.devicePixelRatio || 1, SQUEEZE.maxPixelRatio)
    this.items = items
    this.onColumnClick = onColumnClick
    this.prefersReducedMotion = prefersReducedMotion
    this.borderRadius = borderRadius
    this.animationDuration = prefersReducedMotion ? SQUEEZE.reducedMotionDuration : SQUEEZE.duration
    this.activeIndex = items.length ? mod(initialIndex, items.length) : 0

    this.collapsedOffsets = items.map(item => item.collapsedOffsetX ?? 0)
    this.images = items.map(item => {
      const image = new Image()
      if (crossOrigin) image.crossOrigin = crossOrigin
      image.decoding = "async"
      image.src = item.src
      image.onload = this.render
      return image
    })

    this.numSmallCards = clamp(items.length - 4, 1, 3)
    this.visibleCardsCount = 4 + this.numSmallCards
    this.totalGap = SQUEEZE.smallCardGap * this.numSmallCards + 3 * SQUEEZE.largeCardGap

    this.canvas.addEventListener("pointermove", this.handlePointerMove)
    this.canvas.addEventListener("pointerleave", this.handlePointerLeave)
    this.canvas.addEventListener("click", this.handleClick)
    document.addEventListener("visibilitychange", this.render)

    this.resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            cancelAnimationFrame(this.resizeFrame)
            this.resizeFrame = requestAnimationFrame(this.resize)
          })
    this.resizeObserver?.observe(this.canvas)

    this.measure()
    this.cards = Array.from({ length: this.visibleCardsCount }, (_, column) => {
      const itemIndex = mod(this.activeIndex + column, Math.max(items.length, 1))
      return {
        itemIndex,
        image: this.images[itemIndex],
        x: 0,
        width: this.getCardWidth(column),
        leftGap: column < 4 ? SQUEEZE.largeCardGap : SQUEEZE.smallCardGap,
        collapsedOffsetX: column === 0 ? 0 : this.collapsedOffsets[itemIndex],
        columnIndex: column,
      }
    })
    this.render()
  }

  /** Advance by `delta` columns (negative values go backwards). */
  navigate = (delta: number) => {
    if (this.disposed || !this.items.length || delta === 0) return
    this.activeIndex = mod(this.activeIndex + delta, this.items.length)
    if (delta > 0) this.goToNext(delta)
    else this.goToPrevious(-delta)
  }

  /** Jump to an item, taking the shortest direction around the loop. */
  setActiveIndex = (index: number) => {
    if (!this.items.length) return
    const target = mod(index, this.items.length)
    const forward = mod(target - this.activeIndex, this.items.length)
    const backward = mod(this.activeIndex - target, this.items.length)
    if (forward === 0) return
    this.navigate(forward <= backward ? forward : -backward)
  }

  dispose = () => {
    this.disposed = true
    cancelAnimationFrame(this.animationFrame)
    cancelAnimationFrame(this.resizeFrame)
    this.resizeObserver?.disconnect()
    this.canvas.removeEventListener("pointermove", this.handlePointerMove)
    this.canvas.removeEventListener("pointerleave", this.handlePointerLeave)
    this.canvas.removeEventListener("click", this.handleClick)
    document.removeEventListener("visibilitychange", this.render)
    this.images.forEach(image => {
      image.onload = null
      image.src = ""
    })
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.canvas.width = 0
    this.canvas.height = 0
    this.canvas.style.removeProperty("cursor")
  }

  /* ---- layout ---------------------------------------------------------------------------------- */

  private measure() {
    const { width, height } = this.canvas.getBoundingClientRect()
    this.canvas.width = Math.round(width * this.dpr)
    this.canvas.height = Math.round(height * this.dpr)
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.canvasWidth = width
    this.canvasHeight = height
    this.primaryBaseWidth = height * SQUEEZE.primaryAspectRatio
    this.totalFlexWidth = width - this.primaryBaseWidth - this.totalGap - SQUEEZE.smallCardWidth * this.numSmallCards
    this.imageWidth = this.primaryBaseWidth + this.totalFlexWidth * SQUEEZE.flexStretched[0]
  }

  private resize = () => {
    if (this.disposed) return
    this.measure()
    cancelAnimationFrame(this.animationFrame)
    for (const card of this.cards) {
      card.width = this.getCardWidth(card.columnIndex)
      card.leftGap = card.columnIndex < 4 ? SQUEEZE.largeCardGap : SQUEEZE.smallCardGap
    }
    this.hoveredColumn = -1
    this.updateFlex()
  }

  private getCardWidth(column: number) {
    if (column < 0 || column > 3) {
      const hoverOffset = this.hoveredColumn === column ? this.targetFlexWidthOffset : 0
      return SQUEEZE.smallCardWidth + hoverOffset
    }
    const available = this.totalFlexWidth - this.targetFlexWidthOffset
    if (column === 0) return this.primaryBaseWidth + available * this.flex[0]
    return available * this.flex[column]
  }

  private updateFlex() {
    const hovered = this.hoveredColumn
    if (hovered >= 0 && hovered <= 3 && !this.prefersReducedMotion) {
      this.flex = SQUEEZE.flex.map((_, column) =>
        column === hovered ? SQUEEZE.flexStretched[column] : SQUEEZE.flexSqueezed[column],
      )
    } else {
      this.flex = [...SQUEEZE.flex]
    }
    this.canvas.style.cursor = hovered > 0 ? "pointer" : ""
    this.startAnimation()
  }

  /* ---- navigation ------------------------------------------------------------------------------ */

  private goToPrevious(steps: number) {
    for (let i = 0; i < steps; i += 1) {
      const itemIndex = mod(this.cards[0].itemIndex - 1, this.items.length)
      this.cards.unshift({
        itemIndex,
        image: this.images[itemIndex],
        x: 0,
        width: SQUEEZE.smallCardWidth,
        leftGap: SQUEEZE.largeCardGap,
        collapsedOffsetX: 0,
        columnIndex: 0,
      })
    }
    this.cards.forEach((card, index) => {
      card.columnIndex = index + this.columnIndexOffset
    })
    this.startAnimation(steps)
  }

  private goToNext(steps: number) {
    for (let i = 0; i < steps; i += 1) {
      const itemIndex = mod(this.cards[this.cards.length - 1].itemIndex + 1, this.items.length)
      this.cards.push({
        itemIndex,
        image: this.images[itemIndex],
        x: 0,
        width: SQUEEZE.smallCardWidth,
        leftGap: SQUEEZE.smallCardGap,
        collapsedOffsetX: this.collapsedOffsets[itemIndex],
        columnIndex: 0,
      })
    }
    this.columnIndexOffset -= steps
    this.cards.forEach((card, index) => {
      card.columnIndex = index + this.columnIndexOffset
    })
    this.startAnimation()
  }

  /* ---- animation ------------------------------------------------------------------------------- */

  private startAnimation(prependedCards = 0) {
    const slot = SQUEEZE.smallCardWidth + SQUEEZE.largeCardGap
    this.startCardsOffsetX = this.cardsOffsetX - prependedCards * slot
    this.targetCardsOffsetX = this.columnIndexOffset * slot
    this.startFlexWidthOffset = this.flexWidthOffset
    this.targetFlexWidthOffset = !this.prefersReducedMotion && this.hoveredColumn > 3 ? SQUEEZE.smallCardHoverOffset : 0

    for (const card of this.cards) {
      const column = card.columnIndex
      card.startCollapsedOffsetX = card.collapsedOffsetX
      card.targetCollapsedOffsetX = column === 0 ? 0 : this.collapsedOffsets[card.itemIndex]
      card.startWidth = card.width
      card.targetWidth = this.getCardWidth(column)
      card.startLeftGap = card.leftGap
      card.targetLeftGap = column < 4 ? SQUEEZE.largeCardGap : SQUEEZE.smallCardGap
    }

    this.animationStartAt = performance.now()
    cancelAnimationFrame(this.animationFrame)
    this.animationFrame = requestAnimationFrame(this.animate)
  }

  private animate = (now: number) => {
    const progress = Math.min((now - this.animationStartAt) / this.animationDuration, 1)
    const eased = easeOutExpo(progress)

    this.cardsOffsetX = lerp(this.startCardsOffsetX, this.targetCardsOffsetX, eased)
    this.flexWidthOffset = lerp(this.startFlexWidthOffset, this.targetFlexWidthOffset, eased)
    for (const card of this.cards) {
      card.collapsedOffsetX = lerp(
        card.startCollapsedOffsetX ?? card.collapsedOffsetX,
        card.targetCollapsedOffsetX ?? card.collapsedOffsetX,
        eased,
      )
      card.width = lerp(card.startWidth ?? card.width, card.targetWidth ?? card.width, eased)
      card.leftGap = lerp(card.startLeftGap ?? card.leftGap, card.targetLeftGap ?? card.leftGap, eased)
    }

    this.render()

    if (eased < 1) {
      this.animationFrame = requestAnimationFrame(this.animate)
    } else {
      this.finishAnimation()
    }
  }

  private finishAnimation() {
    const first = this.cards.findIndex(card => card.columnIndex === 0)
    this.cards = this.cards.slice(Math.max(first, 0), Math.max(first, 0) + this.visibleCardsCount)
    this.columnIndexOffset = 0
    this.cardsOffsetX = 0
    this.render()
  }

  /* ---- rendering ------------------------------------------------------------------------------- */

  private render = () => {
    if (this.disposed) return
    this.cards.forEach((card, index) => {
      card.x = index === 0 ? this.cardsOffsetX : this.cards[index - 1].x + this.cards[index - 1].width + card.leftGap
    })
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    for (const card of this.cards) {
      if (card.x + card.width < 0 || card.x > this.canvasWidth) continue
      this.renderCard(card)
    }
  }

  private renderCard({ image, width, x, collapsedOffsetX }: EngineCard) {
    if (!image.complete || image.naturalWidth === 0 || width <= 0) return

    const { ctx, canvasHeight, imageWidth } = this
    ctx.save()
    this.clipRoundedColumn(x, width)

    // Cover-fit the image into the fixed image box, then centre that box on the card.
    const imageRatio = image.naturalWidth / image.naturalHeight
    let drawWidth: number
    let drawHeight: number
    let boxOffsetX: number
    let boxOffsetY: number
    if (imageRatio > imageWidth / canvasHeight) {
      drawHeight = canvasHeight
      drawWidth = canvasHeight * imageRatio
      boxOffsetX = (imageWidth - drawWidth) / 2
      boxOffsetY = 0
    } else {
      drawWidth = imageWidth
      drawHeight = imageWidth / imageRatio
      boxOffsetX = 0
      boxOffsetY = (canvasHeight - drawHeight) / 2
    }
    const drawX = boxOffsetX + (x + width / 2 - drawWidth / 2) - collapsedOffsetX
    ctx.drawImage(image, drawX, boxOffsetY, drawWidth, drawHeight)
    ctx.restore()
  }

  private clipRoundedColumn(x: number, width: number) {
    const height = this.canvasHeight
    const radius = clamp(this.borderRadius, 0, Math.min(width, height) / 2)
    const path = new Path2D()
    path.moveTo(x + radius, 0)
    path.lineTo(x + width - radius, 0)
    path.arcTo(x + width, 0, x + width, radius, radius)
    path.lineTo(x + width, height - radius)
    path.arcTo(x + width, height, x + width - radius, height, radius)
    path.lineTo(x + radius, height)
    path.arcTo(x, height, x, height - radius, radius)
    path.lineTo(x, radius)
    path.arcTo(x, 0, x + radius, 0, radius)
    path.closePath()
    this.ctx.clip(path)
  }

  /* ---- pointer --------------------------------------------------------------------------------- */

  private columnAt(offsetX: number) {
    return this.cards.find(card => card.x <= offsetX && offsetX <= card.x + card.width)?.columnIndex ?? -1
  }

  private handlePointerMove = (event: PointerEvent) => {
    if (event.pointerType === "touch") return
    const column = this.columnAt(event.offsetX)
    if (column >= 0 && column !== this.hoveredColumn) {
      this.hoveredColumn = column
      this.updateFlex()
    }
  }

  private handlePointerLeave = () => {
    if (this.hoveredColumn === -1) return
    this.hoveredColumn = -1
    this.updateFlex()
  }

  private handleClick = (event: MouseEvent) => {
    const column = this.columnAt(event.offsetX)
    if (column > 0) this.onColumnClick(column)
  }
}

/* -------------------------------------------------------------------------------------------------
 * Hooks
 * -----------------------------------------------------------------------------------------------*/

function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    onChange => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)")
      query.addEventListener("change", onChange)
      return () => query.removeEventListener("change", onChange)
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  )
}

/** True once the element has come within `rootMargin` of the viewport. Never goes back to false. */
function useNearViewport<T extends Element>(ref: React.RefObject<T | null>, rootMargin = "3000px 0px") {
  const [isNear, setIsNear] = React.useState(false)
  React.useEffect(() => {
    const element = ref.current
    if (!element || isNear) return
    if (typeof IntersectionObserver === "undefined") {
      setIsNear(true)
      return
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setIsNear(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin, isNear])
  return isNear
}

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return node => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<T | null>).current = node
    }
  }
}

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

interface SqueezeCarouselContextValue {
  items: SqueezeCarouselItem[]
  count: number
  activeIndex: number
  activeIndexRef: React.MutableRefObject<number>
  goTo: (index: number, options?: SqueezeCarouselNavigateOptions) => void
  goToNext: (steps?: number, options?: SqueezeCarouselNavigateOptions) => void
  goToPrevious: (steps?: number, options?: SqueezeCarouselNavigateOptions) => void
  engineRef: React.MutableRefObject<SqueezeCanvasEngine | null>
  actionRefs: React.MutableRefObject<Map<number, HTMLElement>>
  titleId: string
  borderRadius: number
  crossOrigin?: SqueezeCarouselCrossOrigin
  prefersReducedMotion: boolean
}

const SqueezeCarouselContext = React.createContext<SqueezeCarouselContextValue | null>(null)

export function useSqueezeCarousel() {
  const context = React.useContext(SqueezeCarouselContext)
  if (!context) throw new Error("SqueezeCarousel components must be used within <SqueezeCarousel>")
  return context
}

interface SqueezeCarouselItemContextValue {
  item: SqueezeCarouselItem
  index: number
  /** Which list this item is rendered in. Only the desktop details take part in focus management. */
  surface: "details" | "mobile"
}

const SqueezeCarouselItemContext = React.createContext<SqueezeCarouselItemContextValue | null>(null)

export function useSqueezeCarouselItem() {
  const context = React.useContext(SqueezeCarouselItemContext)
  if (!context) {
    throw new Error(
      "SqueezeCarousel item components must be used within <SqueezeCarouselDetail> or <SqueezeCarouselMobileItem>",
    )
  }
  return context
}

/* -------------------------------------------------------------------------------------------------
 * Root
 * -----------------------------------------------------------------------------------------------*/

export interface SqueezeCarouselProps extends React.ComponentProps<"section"> {
  /** Items to show. Keep the array reference stable (module scope or useMemo) to avoid re-creating the canvas. */
  items: SqueezeCarouselItem[]
  /** Controlled active item index. */
  activeIndex?: number
  /** Initial active item index for uncontrolled usage. @default 0 */
  defaultActiveIndex?: number
  /** Called whenever the active index changes, in both controlled and uncontrolled mode. */
  onActiveIndexChange?: (index: number) => void
  /** Corner radius of the cards in CSS pixels. @default 6 */
  borderRadius?: number
  /** `crossOrigin` used when loading canvas images. Only needed if you read the canvas pixels back. */
  crossOrigin?: SqueezeCarouselCrossOrigin
  /** Text announced to screen readers when the active item changes. */
  announce?: (item: SqueezeCarouselItem, index: number, count: number) => string
}

const defaultAnnounce = (item: SqueezeCarouselItem, index: number, count: number) =>
  `Item ${index + 1} of ${count}: ${item.title}`

function SqueezeCarousel({
  items,
  activeIndex: activeIndexProp,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  borderRadius = SQUEEZE.borderRadius,
  crossOrigin,
  announce = defaultAnnounce,
  className,
  style,
  children,
  ...props
}: SqueezeCarouselProps) {
  const count = items.length
  const [activeIndexState, setActiveIndexState] = useControllableState({
    prop: activeIndexProp,
    defaultProp: defaultActiveIndex,
    onChange: onActiveIndexChange,
    caller: "SqueezeCarousel",
  })
  const activeIndex = count ? mod(activeIndexState, count) : 0

  const titleId = React.useId()
  const engineRef = React.useRef<SqueezeCanvasEngine | null>(null)
  const actionRefs = React.useRef(new Map<number, HTMLElement>())
  const activeIndexRef = React.useRef(activeIndex)
  activeIndexRef.current = activeIndex
  const prefersReducedMotion = usePrefersReducedMotion()
  const [focusRequest, setFocusRequest] = React.useState(0)

  const navigateBy = React.useCallback(
    (delta: number, options?: SqueezeCarouselNavigateOptions) => {
      if (!count) return
      if (delta !== 0) {
        engineRef.current?.navigate(delta)
        setActiveIndexState(previous => mod((previous ?? 0) + delta, count))
      }
      if (options?.focus) setFocusRequest(request => request + 1)
    },
    [count, setActiveIndexState],
  )

  const goToNext = React.useCallback(
    (steps = 1, options?: SqueezeCarouselNavigateOptions) => navigateBy(Math.abs(steps), options),
    [navigateBy],
  )
  const goToPrevious = React.useCallback(
    (steps = 1, options?: SqueezeCarouselNavigateOptions) => navigateBy(-Math.abs(steps), options),
    [navigateBy],
  )
  const goTo = React.useCallback(
    (index: number, options?: SqueezeCarouselNavigateOptions) => {
      if (!count) return
      const target = mod(index, count)
      const current = activeIndexRef.current
      const forward = mod(target - current, count)
      const backward = mod(current - target, count)
      navigateBy(forward <= backward ? forward : -backward, options)
    },
    [count, navigateBy],
  )

  // Keep the canvas in sync with controlled updates coming from outside.
  React.useEffect(() => {
    const engine = engineRef.current
    if (engine && engine.activeIndex !== activeIndex) engine.setActiveIndex(activeIndex)
  }, [activeIndex])

  // Move focus to the active action after keyboard navigation.
  React.useEffect(() => {
    if (focusRequest === 0) return
    actionRefs.current.get(activeIndex)?.focus()
  }, [focusRequest, activeIndex])

  const value = React.useMemo<SqueezeCarouselContextValue>(
    () => ({
      items,
      count,
      activeIndex,
      activeIndexRef,
      goTo,
      goToNext,
      goToPrevious,
      engineRef,
      actionRefs,
      titleId,
      borderRadius,
      crossOrigin,
      prefersReducedMotion,
    }),
    [items, count, activeIndex, goTo, goToNext, goToPrevious, titleId, borderRadius, crossOrigin, prefersReducedMotion],
  )

  const activeItem = items[activeIndex]

  return (
    <SqueezeCarouselContext.Provider value={value}>
      <section
        data-slot="squeeze-carousel"
        data-active-index={activeIndex}
        aria-roledescription="carousel"
        aria-labelledby={titleId}
        className={cn("flex w-full flex-col gap-8", className)}
        style={{ "--squeeze-carousel-radius": `${borderRadius}px`, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
        <div data-slot="squeeze-carousel-status" aria-live="polite" aria-atomic="true" className="sr-only">
          {activeItem ? announce(activeItem, activeIndex, count) : null}
        </div>
      </section>
    </SqueezeCarouselContext.Provider>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Header
 * -----------------------------------------------------------------------------------------------*/

export type SqueezeCarouselHeaderProps = React.ComponentProps<"header">

function SqueezeCarouselHeader({ className, ...props }: SqueezeCarouselHeaderProps) {
  return (
    <header
      data-slot="squeeze-carousel-header"
      className={cn("mb-2 flex items-end justify-between gap-16 lg:mb-0", className)}
      {...props}
    />
  )
}

export type SqueezeCarouselHeadingProps = React.ComponentProps<"div">

function SqueezeCarouselHeading({ className, ...props }: SqueezeCarouselHeadingProps) {
  return (
    <div data-slot="squeeze-carousel-heading" className={cn("flex flex-col sm:mb-2 lg:mb-8", className)} {...props} />
  )
}

export interface SqueezeCarouselTitleProps extends React.ComponentProps<"h2"> {
  asChild?: boolean
}

const headingLgClassName =
  "max-w-[43ch] text-pretty text-[1.375rem] font-light leading-[1.2] tracking-[-0.01em] sm:text-[1.75rem] sm:leading-[1.1] lg:text-[2rem] lg:leading-[1.07] lg:tracking-[-0.02em]"

function SqueezeCarouselTitle({ asChild, className, ...props }: SqueezeCarouselTitleProps) {
  const { titleId } = useSqueezeCarousel()
  const Comp = asChild ? Slot : "h2"
  return (
    <Comp
      id={titleId}
      data-slot="squeeze-carousel-title"
      className={cn(headingLgClassName, "text-foreground", className)}
      {...props}
    />
  )
}

export interface SqueezeCarouselDescriptionProps extends React.ComponentProps<"p"> {
  asChild?: boolean
}

function SqueezeCarouselDescription({ asChild, className, ...props }: SqueezeCarouselDescriptionProps) {
  const Comp = asChild ? Slot : "p"
  return (
    <Comp
      data-slot="squeeze-carousel-description"
      className={cn(headingLgClassName, "text-muted-foreground", className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------------------------------
 * Controls
 * -----------------------------------------------------------------------------------------------*/

export type SqueezeCarouselControlsProps = React.ComponentProps<"div">

function SqueezeCarouselControls({ className, ...props }: SqueezeCarouselControlsProps) {
  return (
    <div
      role="group"
      aria-label="Carousel navigation"
      data-slot="squeeze-carousel-controls"
      className={cn("hidden shrink-0 gap-2 sm:flex", className)}
      {...props}
    />
  )
}

export type SqueezeCarouselNavButtonProps = React.ComponentProps<typeof Button>

function useNavKeyDown(onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>) {
  const { goToNext, goToPrevious } = useSqueezeCarousel()
  return React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented) return
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        goToPrevious()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        goToNext()
      }
    },
    [onKeyDown, goToNext, goToPrevious],
  )
}

const navButtonClassName = "size-10 rounded-md [&_svg]:size-4"

function SqueezeCarouselPrevious({ className, children, onClick, onKeyDown, ...props }: SqueezeCarouselNavButtonProps) {
  const { goToPrevious } = useSqueezeCarousel()
  const handleKeyDown = useNavKeyDown(onKeyDown)
  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      aria-label="Previous slide"
      data-slot="squeeze-carousel-previous"
      className={cn(navButtonClassName, className)}
      onClick={event => {
        onClick?.(event)
        if (!event.defaultPrevented) goToPrevious()
      }}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children ?? <ArrowLeft aria-hidden="true" />}
    </Button>
  )
}

function SqueezeCarouselNext({ className, children, onClick, onKeyDown, ...props }: SqueezeCarouselNavButtonProps) {
  const { goToNext } = useSqueezeCarousel()
  const handleKeyDown = useNavKeyDown(onKeyDown)
  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      aria-label="Next slide"
      data-slot="squeeze-carousel-next"
      className={cn(navButtonClassName, className)}
      onClick={event => {
        onClick?.(event)
        if (!event.defaultPrevented) goToNext()
      }}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children ?? <ArrowRight aria-hidden="true" />}
    </Button>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Canvas (desktop image strip)
 * -----------------------------------------------------------------------------------------------*/

export type SqueezeCarouselCanvasProps = React.ComponentProps<"canvas">

function SqueezeCarouselCanvas({ className, ref, ...props }: SqueezeCarouselCanvasProps) {
  const { items, engineRef, activeIndexRef, goToNext, borderRadius, crossOrigin, prefersReducedMotion } =
    useSqueezeCarousel()
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const isNear = useNearViewport(canvasRef)
  const goToNextRef = React.useRef(goToNext)
  goToNextRef.current = goToNext

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isNear || items.length === 0) return
    const engine = new SqueezeCanvasEngine({
      canvas,
      items,
      initialIndex: activeIndexRef.current,
      onColumnClick: steps => goToNextRef.current(steps),
      prefersReducedMotion,
      borderRadius,
      crossOrigin,
    })
    engineRef.current = engine
    return () => {
      engine.dispose()
      if (engineRef.current === engine) engineRef.current = null
    }
  }, [items, isNear, prefersReducedMotion, borderRadius, crossOrigin, engineRef, activeIndexRef])

  return (
    <canvas
      ref={composeRefs(canvasRef, ref)}
      data-slot="squeeze-carousel-canvas"
      aria-hidden="true"
      className={cn("hidden aspect-[1232/460] w-full sm:block", className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------------------------------
 * Details (desktop copy under the canvas)
 * -----------------------------------------------------------------------------------------------*/

export interface SqueezeCarouselDetailsProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Either static children or a render function called once per item. */
  children?: React.ReactNode | SqueezeCarouselRenderItem
}

function SqueezeCarouselDetails({ className, children, ...props }: SqueezeCarouselDetailsProps) {
  const { items } = useSqueezeCarousel()
  return (
    <div data-slot="squeeze-carousel-details" className={cn("hidden min-w-0 sm:flex", className)} {...props}>
      {typeof children === "function"
        ? items.map((item, index) => <React.Fragment key={item.id}>{children(item, index)}</React.Fragment>)
        : children}
    </div>
  )
}

export interface SqueezeCarouselDetailProps extends React.ComponentProps<"div"> {
  /** Index of the item this detail belongs to. */
  index: number
}

function SqueezeCarouselDetail({ index, className, style, ...props }: SqueezeCarouselDetailProps) {
  const { items, activeIndex, count } = useSqueezeCarousel()
  const item = items[index]
  const active = index === activeIndex
  const value = React.useMemo<SqueezeCarouselItemContextValue>(
    () => ({ item, index, surface: "details" }),
    [item, index],
  )
  if (!item) return null
  return (
    <SqueezeCarouselItemContext.Provider value={value}>
      <div
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${count}`}
        aria-hidden={!active}
        data-slot="squeeze-carousel-detail"
        data-state={active ? "active" : "inactive"}
        data-index={index}
        className={cn(
          "grid w-full shrink-0 content-start items-start justify-between gap-8 transition-opacity duration-[120ms] ease-linear motion-reduce:transition-none lg:grid-cols-[1fr_auto]",
          "data-[state=inactive]:pointer-events-none data-[state=inactive]:opacity-0",
          className,
        )}
        style={{ transform: `translateX(${-100 * index}%)`, ...style }}
        {...props}
      />
    </SqueezeCarouselItemContext.Provider>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Item copy (shared by details and mobile cards)
 * -----------------------------------------------------------------------------------------------*/

const fadeWithScrollStyle: React.CSSProperties = { opacity: "calc(1 - var(--squeeze-item-distance, 0))" }

export type SqueezeCarouselDetailCopyProps = React.ComponentProps<"div">

function SqueezeCarouselDetailCopy({ className, style, ...props }: SqueezeCarouselDetailCopyProps) {
  const { surface } = useSqueezeCarouselItem()
  const { prefersReducedMotion } = useSqueezeCarousel()
  const mobile = surface === "mobile"
  return (
    <div
      data-slot="squeeze-carousel-detail-copy"
      className={cn(!mobile && "pr-28 lg:max-w-[calc(460px*16/9)] lg:pr-0", className)}
      style={mobile && !prefersReducedMotion ? { ...fadeWithScrollStyle, ...style } : style}
      {...props}
    />
  )
}

const headingSmClassName =
  "inline text-[1.125rem] font-light leading-[1.25] tracking-[-0.01em] sm:text-[1.25rem] sm:leading-[1.12] lg:text-[1.375rem] lg:leading-[1.1]"

export interface SqueezeCarouselDetailTitleProps extends React.ComponentProps<"h3"> {
  asChild?: boolean
}

function SqueezeCarouselDetailTitle({ asChild, className, ...props }: SqueezeCarouselDetailTitleProps) {
  const Comp = asChild ? Slot : "h3"
  return (
    <Comp
      data-slot="squeeze-carousel-detail-title"
      className={cn(headingSmClassName, "text-foreground after:content-['_']", className)}
      {...props}
    />
  )
}

export interface SqueezeCarouselDetailDescriptionProps extends React.ComponentProps<"p"> {
  asChild?: boolean
}

function SqueezeCarouselDetailDescription({ asChild, className, ...props }: SqueezeCarouselDetailDescriptionProps) {
  const Comp = asChild ? Slot : "p"
  return (
    <Comp
      data-slot="squeeze-carousel-detail-description"
      className={cn(headingSmClassName, "text-muted-foreground", className)}
      {...props}
    />
  )
}

export type SqueezeCarouselDetailActionProps = React.ComponentProps<typeof Button>

function SqueezeCarouselDetailAction({
  className,
  style,
  onFocus,
  onKeyDown,
  ref,
  ...props
}: SqueezeCarouselDetailActionProps) {
  const { index, surface } = useSqueezeCarouselItem()
  const { activeIndex, count, goTo, goToNext, goToPrevious, actionRefs, prefersReducedMotion } = useSqueezeCarousel()
  const mobile = surface === "mobile"
  const active = index === activeIndex

  const registerRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      if (mobile) return
      if (node) actionRefs.current.set(index, node)
      else actionRefs.current.delete(index)
    },
    [actionRefs, index, mobile],
  )

  return (
    <Button
      ref={composeRefs(registerRef, ref)}
      variant="outline"
      data-slot="squeeze-carousel-detail-action"
      data-state={mobile ? undefined : active ? "active" : "inactive"}
      tabIndex={mobile ? undefined : active ? 0 : -1}
      className={cn(
        "group h-12 gap-2 rounded-md px-5 text-base font-medium",
        mobile && "mt-auto self-start",
        className,
      )}
      style={mobile && !prefersReducedMotion ? { ...fadeWithScrollStyle, ...style } : style}
      onFocus={event => {
        onFocus?.(event)
        if (!mobile && !event.defaultPrevented && !active) goTo(index)
      }}
      onKeyDown={event => {
        onKeyDown?.(event)
        if (mobile || event.defaultPrevented) return
        switch (event.key) {
          case "ArrowLeft":
            event.preventDefault()
            goToPrevious(1, { focus: true })
            break
          case "ArrowRight":
            event.preventDefault()
            goToNext(1, { focus: true })
            break
          case "Home":
            event.preventDefault()
            goTo(0, { focus: true })
            break
          case "End":
            event.preventDefault()
            goTo(count - 1, { focus: true })
            break
        }
      }}
      {...props}
    />
  )
}

export type SqueezeCarouselActionIconProps = React.ComponentProps<"svg">

/** Arrow whose shaft grows in when the parent `.group` is hovered. */
function SqueezeCarouselActionIcon({ className, ...props }: SqueezeCarouselActionIconProps) {
  const clipId = React.useId()
  return (
    <svg
      data-slot="squeeze-carousel-action-icon"
      width="5"
      height="8"
      viewBox="0 0.5 5 8"
      fill="none"
      aria-hidden="true"
      className={cn("inline size-auto shrink-0 overflow-visible", className)}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width="12" height="9" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <g className="transition-transform duration-300 ease-[cubic-bezier(.25,1,.5,1)] group-hover:translate-x-1.5 motion-reduce:transition-none">
          <rect
            className="opacity-0 transition-opacity duration-300 ease-[cubic-bezier(.25,1,.5,1)] group-hover:opacity-100 motion-reduce:transition-none"
            x="-10"
            y="3.375"
            width="13"
            height="1.75"
            fill="currentColor"
          />
          <path
            d="M4.84766 3.63379L5.45898 4.25L4.84766 4.86621L1.24219 8.49902L0 7.2666L2.99316 4.24902L0 1.23242L1.24219 0L4.84766 3.63379Z"
            fill="currentColor"
          />
        </g>
      </g>
    </svg>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Mobile list (scroll-snap cards below the sm breakpoint)
 * -----------------------------------------------------------------------------------------------*/

export interface SqueezeCarouselMobileListProps extends Omit<React.ComponentProps<"ul">, "children"> {
  /** Either static children or a render function called once per item. */
  children?: React.ReactNode | SqueezeCarouselRenderItem
}

function SqueezeCarouselMobileList({ className, children, onScroll, ref, ...props }: SqueezeCarouselMobileListProps) {
  const { items } = useSqueezeCarousel()
  const listRef = React.useRef<HTMLUListElement | null>(null)
  const frame = React.useRef(0)

  const updateProgress = React.useCallback(() => {
    const list = listRef.current
    if (!list) return
    const first = list.firstElementChild as HTMLElement | null
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0
    const step = first ? first.offsetWidth + gap : list.clientWidth
    list.style.setProperty("--squeeze-scroll-progress", step > 0 ? String(list.scrollLeft / step) : "0")
  }, [])

  React.useEffect(() => {
    updateProgress()
    const list = listRef.current
    if (!list || typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver(updateProgress)
    observer.observe(list)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame.current)
    }
  }, [updateProgress])

  return (
    <ul
      ref={composeRefs(listRef, ref)}
      role="list"
      data-slot="squeeze-carousel-mobile-list"
      className={cn(
        "flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:hidden",
        className,
      )}
      onScroll={event => {
        onScroll?.(event)
        cancelAnimationFrame(frame.current)
        frame.current = requestAnimationFrame(updateProgress)
      }}
      {...props}
    >
      {typeof children === "function"
        ? items.map((item, index) => <React.Fragment key={item.id}>{children(item, index)}</React.Fragment>)
        : children}
    </ul>
  )
}

export interface SqueezeCarouselMobileItemProps extends React.ComponentProps<"li"> {
  /** Index of the item this card belongs to. */
  index: number
}

function SqueezeCarouselMobileItem({ index, className, style, ...props }: SqueezeCarouselMobileItemProps) {
  const { items } = useSqueezeCarousel()
  const item = items[index]
  const value = React.useMemo<SqueezeCarouselItemContextValue>(
    () => ({ item, index, surface: "mobile" }),
    [item, index],
  )
  if (!item) return null
  return (
    <SqueezeCarouselItemContext.Provider value={value}>
      <li
        data-slot="squeeze-carousel-mobile-item"
        data-index={index}
        className={cn("flex shrink-0 basis-full snap-start flex-col gap-6", className)}
        style={
          {
            "--squeeze-item-index": String(index),
            "--squeeze-item-progress":
              "clamp(-1, calc(var(--squeeze-item-index) - var(--squeeze-scroll-progress, 0)), 1)",
            "--squeeze-item-distance": "max(var(--squeeze-item-progress), calc(-1 * var(--squeeze-item-progress)))",
            ...style,
          } as React.CSSProperties
        }
        {...props}
      />
    </SqueezeCarouselItemContext.Provider>
  )
}

export type SqueezeCarouselMobileMediaProps = React.ComponentProps<"div">

/** Image area of a mobile card. Renders the item's `mobileSrc` (or `src`) unless you pass children. */
function SqueezeCarouselMobileMedia({ className, style, children, ...props }: SqueezeCarouselMobileMediaProps) {
  const { item } = useSqueezeCarouselItem()
  const { prefersReducedMotion } = useSqueezeCarousel()
  return (
    <div
      data-slot="squeeze-carousel-mobile-media"
      className={cn(
        "pointer-events-none relative aspect-[336/350] origin-center overflow-hidden rounded-[var(--squeeze-carousel-radius)] bg-muted",
        className,
      )}
      style={
        {
          "--squeeze-card-scale": "calc(1 - var(--squeeze-item-distance, 0) * 0.05)",
          "--squeeze-gap-offset":
            "calc(((1 - var(--squeeze-card-scale)) * 50% + 7px / var(--squeeze-card-scale)) * var(--squeeze-item-progress, 0) * -1)",
          transform: "translate3d(var(--squeeze-gap-offset), 0, 0) scale(var(--squeeze-card-scale))",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children ?? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.mobileSrc ?? item.src}
          alt={item.alt ?? item.title}
          loading="lazy"
          draggable={false}
          data-slot="squeeze-carousel-mobile-image"
          className="absolute top-0 left-1/2 h-full w-full max-w-none object-cover select-none"
          style={{
            transform: prefersReducedMotion
              ? "translate3d(-50%, 0, 0)"
              : "translate3d(calc(-50% + (-30px * var(--squeeze-item-progress, 0))), 0, 0)",
          }}
        />
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

export {
  SqueezeCarousel,
  SqueezeCarouselHeader,
  SqueezeCarouselHeading,
  SqueezeCarouselTitle,
  SqueezeCarouselDescription,
  SqueezeCarouselControls,
  SqueezeCarouselPrevious,
  SqueezeCarouselNext,
  SqueezeCarouselCanvas,
  SqueezeCarouselDetails,
  SqueezeCarouselDetail,
  SqueezeCarouselDetailCopy,
  SqueezeCarouselDetailTitle,
  SqueezeCarouselDetailDescription,
  SqueezeCarouselDetailAction,
  SqueezeCarouselActionIcon,
  SqueezeCarouselMobileList,
  SqueezeCarouselMobileItem,
  SqueezeCarouselMobileMedia,
}
