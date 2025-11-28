"use client"

import * as React from "react"
import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
  type ReactNode,
  type RefObject,
  type ComponentProps,
  type HTMLAttributes,
} from "react"
import { cn } from "@/lib/utils"

// ============================================================================
// Types
// ============================================================================

export interface TOCItemType {
  title: ReactNode
  url: string
  depth: number
}

export type TableOfContents = TOCItemType[]

// ============================================================================
// Contexts
// ============================================================================

const ActiveAnchorContext = createContext<string[]>([])
const ScrollContext = createContext<RefObject<HTMLElement | null>>({ current: null })
const TOCContext = createContext<TOCItemType[]>([])

// ============================================================================
// Hooks
// ============================================================================

/**
 * The id of visible anchors
 */
export function useActiveAnchors(): string[] {
  return useContext(ActiveAnchorContext)
}

/**
 * The estimated active heading ID
 */
export function useActiveAnchor(): string | undefined {
  return useContext(ActiveAnchorContext)[0]
}

/**
 * Get TOC items from context
 */
export function useTOCItems(): TOCItemType[] {
  return useContext(TOCContext)
}

// ============================================================================
// Utility Functions
// ============================================================================

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === "function") {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}

/**
 * Find the active heading of page using IntersectionObserver
 */
function useAnchorObserver(watch: string[], single: boolean): string[] {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [activeAnchor, setActiveAnchor] = useState<string[]>([])
  const stateRef = useRef<{ visible: Set<string> } | null>(null)

  const onChange = React.useCallback(
    (entries: IntersectionObserverEntry[]) => {
      stateRef.current ??= { visible: new Set() }
      const state = stateRef.current

      for (const entry of entries) {
        if (entry.isIntersecting) {
          state.visible.add(entry.target.id)
        } else {
          state.visible.delete(entry.target.id)
        }
      }

      if (state.visible.size === 0) {
        const viewTop = entries[0]?.rootBounds?.top ?? 0
        let fallback: Element | undefined
        let min = -1

        for (const id of watch) {
          const element = document.getElementById(id)
          if (!element) continue

          const d = Math.abs(viewTop - element.getBoundingClientRect().top)
          if (min === -1 || d < min) {
            fallback = element
            min = d
          }
        }

        setActiveAnchor(fallback ? [fallback.id] : [])
      } else {
        const items = watch.filter(item => state.visible.has(item))
        setActiveAnchor(single ? items.slice(0, 1) : items)
      }
    },
    [watch, single],
  )

  useEffect(() => {
    if (observerRef.current) return
    observerRef.current = new IntersectionObserver(onChange, {
      rootMargin: "0px",
      threshold: 0.98,
    })

    return () => {
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [onChange])

  useEffect(() => {
    const observer = observerRef.current
    if (!observer) return
    const elements = watch.flatMap(heading => document.getElementById(heading) ?? [])

    for (const element of elements) observer.observe(element)
    return () => {
      for (const element of elements) observer.unobserve(element)
    }
  }, [watch])

  return activeAnchor
}

// ============================================================================
// TOCProvider - Main context provider
// ============================================================================

export interface TOCProviderProps {
  toc: TableOfContents
  /**
   * Only accept one active item at most
   * @defaultValue false
   */
  single?: boolean
  children?: ReactNode
}

export function TOCProvider({ toc, single = false, children }: TOCProviderProps) {
  const headings = useMemo(() => {
    return toc.map(item => item.url.split("#")[1])
  }, [toc])

  const activeAnchors = useAnchorObserver(headings, single)

  return (
    <TOCContext.Provider value={toc}>
      <ActiveAnchorContext.Provider value={activeAnchors}>{children}</ActiveAnchorContext.Provider>
    </TOCContext.Provider>
  )
}

// ============================================================================
// TOCScrollArea - Scrollable container with auto-scroll support
// ============================================================================

export function TOCScrollArea({ ref, className, ...props }: ComponentProps<"div">) {
  const viewRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={mergeRefs(viewRef, ref)}
      className={cn(
        "relative min-h-0 text-sm ms-px overflow-auto [scrollbar-width:none] [mask-image:linear-gradient(to_bottom,transparent,white_16px,white_calc(100%-16px),transparent)] py-3",
        className,
      )}
      {...props}
    >
      <ScrollContext.Provider value={viewRef}>{props.children}</ScrollContext.Provider>
    </div>
  )
}

// ============================================================================
// TOCThumb - Active indicator that shows current position
// ============================================================================

type TocThumbValues = [top: number, height: number]

interface TocThumbProps extends HTMLAttributes<HTMLDivElement> {
  containerRef: RefObject<HTMLElement | null>
}

function calcThumb(container: HTMLElement, active: string[]): TocThumbValues {
  if (active.length === 0 || container.clientHeight === 0) {
    return [0, 0]
  }

  let upper = Number.MAX_VALUE
  let lower = 0

  for (const item of active) {
    const element = container.querySelector<HTMLElement>(`a[href="#${item}"]`)
    if (!element) continue

    const styles = getComputedStyle(element)
    upper = Math.min(upper, element.offsetTop + parseFloat(styles.paddingTop))
    lower = Math.max(lower, element.offsetTop + element.clientHeight - parseFloat(styles.paddingBottom))
  }

  return [upper, lower - upper]
}

function updateThumb(element: HTMLElement, info: TocThumbValues): void {
  element.style.setProperty("--toc-top", `${info[0]}px`)
  element.style.setProperty("--toc-height", `${info[1]}px`)
}

function TocThumb({ containerRef, ...props }: TocThumbProps) {
  const thumbRef = useRef<HTMLDivElement>(null)
  const active = useActiveAnchors()

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    const onUpdate = () => {
      if (!thumbRef.current) return
      updateThumb(thumbRef.current, calcThumb(container, active))
    }

    const observer = new ResizeObserver(onUpdate)
    observer.observe(container)
    onUpdate()

    return () => {
      observer.disconnect()
    }
  }, [containerRef, active])

  // Initial update
  if (containerRef.current && thumbRef.current) {
    updateThumb(thumbRef.current, calcThumb(containerRef.current, active))
  }

  return <div ref={thumbRef} role="none" {...props} />
}

// ============================================================================
// TOCItem - Individual TOC link item
// ============================================================================

export interface TOCItemProps extends Omit<ComponentProps<"a">, "href"> {
  href: string
  onActiveChange?: (v: boolean) => void
}

export function TOCItem({ ref, onActiveChange, ...props }: TOCItemProps) {
  const containerRef = useContext(ScrollContext)
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const activeAnchors = useActiveAnchors()
  const activeOrder = activeAnchors.indexOf(props.href.slice(1))
  const isActive = activeOrder !== -1
  const shouldScroll = activeOrder === 0

  useLayoutEffect(() => {
    const anchor = anchorRef.current
    const container = containerRef.current

    // -------------------------------------------------------------------------
    // CUSTOM SCROLL IMPLEMENTATION
    // -------------------------------------------------------------------------
    // This replaces the `scroll-into-view-if-needed` library used in fumadocs.
    //
    // LIBRARY ARCHITECTURE:
    // - `scroll-into-view-if-needed`: Options parsing, scroll execution, scroll-margin support
    // - `compute-scroll-into-view`: Core algorithm for boundary/position calculations
    //
    // The `compute-scroll-into-view` library provides sophisticated features:
    // - `alignNearest`: Algorithm that calculates minimum scroll needed (with edge cases)
    // - Scrollbar width/height handling in calculations
    // - Border width accounting for containers
    // - CSS transform scale handling
    // - Visual viewport support (for pinch-zoom)
    // - Multiple scrolling frames (scrolls all ancestors up to boundary)
    //
    // FEATURES WE DON'T IMPLEMENT (not needed for TOC use case):
    // - Shadow DOM support via isInDocument() check
    // - Custom scroll behavior callbacks (behavior: Function)
    // - Multiple scroll targets (only need single container)
    // - CSS scroll-margin-* properties (TOC items don't use these)
    // - `block: 'nearest'` alignNearest algorithm (we always center)
    // - Scrollbar width compensation (TOC uses scrollbar-width: none)
    // - Border width compensation (TOC container has no borders)
    // - CSS transform scale handling (TOC isn't scaled)
    //
    // FEATURES WE DO IMPLEMENT:
    // - Element connectivity check (isConnected)
    // - Boundary constraint (only scroll container, never page)
    // - Smooth scrolling behavior
    // - Center block alignment (block: 'center')
    // - "if-needed" scroll mode (only scroll if out of view)
    //
    // ORIGINAL FUMADOCS IMPLEMENTATION:
    // ```
    // import scrollIntoView from 'scroll-into-view-if-needed'
    //
    // scrollIntoView(anchor, {
    //   behavior: 'smooth',
    //   block: 'center',
    //   inline: 'center',
    //   scrollMode: 'always',
    //   boundary: container,
    // })
    // ```
    //
    // TO SWITCH TO THE LIBRARY:
    // 1. Install: `yarn add scroll-into-view-if-needed`
    // 2. Import: `import scrollIntoView from 'scroll-into-view-if-needed'`
    // 3. Replace the custom code below with the library call above
    //
    // Reference source code available at:
    // - reference/scroll-into-view-if-needed/
    // - reference/compute-scroll-into-view/
    // -------------------------------------------------------------------------

    // Safety check: ensure elements are connected to the DOM
    if (!container || !anchor || !shouldScroll || !anchor.isConnected) {
      return
    }

    const containerRect = container.getBoundingClientRect()
    const anchorRect = anchor.getBoundingClientRect()

    // "if-needed" check: only scroll if anchor is outside the visible area
    const isAbove = anchorRect.top < containerRect.top
    const isBelow = anchorRect.bottom > containerRect.bottom

    if (isAbove || isBelow) {
      // Calculate scroll position to center the anchor in the container
      // This mimics `block: 'center'` from the library
      const anchorCenter = anchor.offsetTop - container.offsetTop + anchor.offsetHeight / 2
      const containerCenter = container.clientHeight / 2
      const scrollTop = anchorCenter - containerCenter

      // Scroll only the container (boundary constraint), not the page
      container.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: "smooth",
      })
    }
  }, [containerRef, shouldScroll])

  useEffect(() => {
    onActiveChange?.(isActive)
  }, [isActive, onActiveChange])

  return (
    <a ref={mergeRefs(anchorRef, ref)} data-active={isActive} {...props}>
      {props.children}
    </a>
  )
}

// ============================================================================
// TOCItems - Simple TOC list with straight border line
// ============================================================================

export interface TOCItemsProps extends ComponentProps<"div"> {
  /**
   * Text to display when there are no headings
   * @defaultValue "No Headings"
   */
  emptyText?: string
}

export function TOCItems({ ref, className, emptyText = "No Headings", ...props }: TOCItemsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const items = useTOCItems()

  if (items.length === 0) {
    return <div className="rounded-lg border bg-card p-3 text-xs text-muted-foreground">{emptyText}</div>
  }

  return (
    <>
      <TocThumb
        containerRef={containerRef}
        className="absolute top-[var(--toc-top)] h-[var(--toc-height)] w-px bg-primary transition-all"
      />
      <div
        ref={mergeRefs(ref, containerRef)}
        className={cn("flex flex-col border-s border-foreground/10", className)}
        {...props}
      >
        {items.map(item => (
          <SimpleTOCItem key={item.url} item={item} />
        ))}
      </div>
    </>
  )
}

function SimpleTOCItem({ item }: { item: TOCItemType }) {
  return (
    <TOCItem
      href={item.url}
      className={cn(
        "prose py-1.5 text-sm text-muted-foreground transition-colors [overflow-wrap:anywhere] first:pt-0 last:pb-0 data-[active=true]:text-primary hover:text-accent-foreground",
        item.depth <= 2 && "ps-3",
        item.depth === 3 && "ps-6",
        item.depth >= 4 && "ps-8",
      )}
    >
      {item.title}
    </TOCItem>
  )
}

// ============================================================================
// ClerkTOCItems - TOC with depth-aware line that follows the hierarchy
// ============================================================================

function getItemOffset(depth: number): number {
  if (depth <= 2) return 14
  if (depth === 3) return 26
  return 36
}

function getLineOffset(depth: number): number {
  return depth >= 3 ? 10 : 0
}

export interface ClerkTOCItemsProps extends ComponentProps<"div"> {
  /**
   * Text to display when there are no headings
   * @defaultValue "No Headings"
   */
  emptyText?: string
}

export function ClerkTOCItems({ ref, className, emptyText = "No Headings", ...props }: ClerkTOCItemsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const items = useTOCItems()

  const [svg, setSvg] = useState<{
    path: string
    width: number
    height: number
  }>()

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    function onResize(): void {
      if (container.clientHeight === 0) return
      let w = 0
      let h = 0
      const d: string[] = []

      for (let i = 0; i < items.length; i++) {
        const element: HTMLElement | null = container.querySelector(`a[href="#${items[i].url.slice(1)}"]`)
        if (!element) continue

        const styles = getComputedStyle(element)
        const offset = getLineOffset(items[i].depth) + 1
        const top = element.offsetTop + parseFloat(styles.paddingTop)
        const bottom = element.offsetTop + element.clientHeight - parseFloat(styles.paddingBottom)

        w = Math.max(offset, w)
        h = Math.max(h, bottom)

        d.push(`${i === 0 ? "M" : "L"}${offset} ${top}`)
        d.push(`L${offset} ${bottom}`)
      }

      setSvg({
        path: d.join(" "),
        width: w + 1,
        height: h,
      })
    }

    const observer = new ResizeObserver(onResize)
    onResize()

    observer.observe(container)
    return () => {
      observer.disconnect()
    }
  }, [items])

  if (items.length === 0) {
    return <div className="rounded-lg border bg-card p-3 text-xs text-muted-foreground">{emptyText}</div>
  }

  return (
    <>
      {svg ? (
        <div
          className="absolute start-0 top-0 rtl:-scale-x-100"
          style={{
            width: svg.width,
            height: svg.height,
            maskImage: `url("data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svg.width} ${svg.height}"><path d="${svg.path}" stroke="black" stroke-width="1" fill="none" /></svg>`,
            )}")`,
          }}
        >
          <TocThumb
            containerRef={containerRef}
            className="mt-[var(--toc-top)] h-[var(--toc-height)] bg-primary transition-all"
          />
        </div>
      ) : null}
      <div ref={mergeRefs(containerRef, ref)} className={cn("flex flex-col", className)} {...props}>
        {items.map((item, i) => (
          <ClerkTOCItemElement key={item.url} item={item} upper={items[i - 1]?.depth} lower={items[i + 1]?.depth} />
        ))}
      </div>
    </>
  )
}

function ClerkTOCItemElement({
  item,
  upper = item.depth,
  lower = item.depth,
}: {
  item: TOCItemType
  upper?: number
  lower?: number
}) {
  const offset = getLineOffset(item.depth)
  const upperOffset = getLineOffset(upper)
  const lowerOffset = getLineOffset(lower)

  return (
    <TOCItem
      href={item.url}
      style={{
        paddingInlineStart: getItemOffset(item.depth),
      }}
      className="prose relative py-1.5 text-sm text-muted-foreground hover:text-accent-foreground transition-colors [overflow-wrap:anywhere] first:pt-0 last:pb-0 data-[active=true]:text-primary"
    >
      {offset !== upperOffset ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          className="absolute -top-1.5 start-0 size-4 rtl:-scale-x-100"
        >
          <line x1={upperOffset} y1="0" x2={offset} y2="12" className="stroke-foreground/10" strokeWidth="1" />
        </svg>
      ) : null}
      <div
        className={cn(
          "absolute inset-y-0 w-px bg-foreground/10",
          offset !== upperOffset && "top-1.5",
          offset !== lowerOffset && "bottom-1.5",
        )}
        style={{
          insetInlineStart: offset,
        }}
      />
      {item.title}
    </TOCItem>
  )
}

// ============================================================================
// PageTOC & PageTOCItems - Convenience wrappers for page layout
// ============================================================================

export interface PageTOCProps extends ComponentProps<"div"> {
  children?: ReactNode
}

export function PageTOC({ className, children, ...props }: PageTOCProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      {children}
    </div>
  )
}

export interface PageTOCItemsProps extends ComponentProps<"div"> {
  /**
   * TOC variant style
   * - "default": Simple straight border line
   * - "clerk": Depth-aware line that follows hierarchy
   * @defaultValue "default"
   */
  variant?: "default" | "clerk"
  /**
   * Text to display when there are no headings
   * @defaultValue "No Headings"
   */
  emptyText?: string
}

export function PageTOCItems({ variant = "default", emptyText, ...props }: PageTOCItemsProps) {
  return (
    <TOCScrollArea>
      {variant === "clerk" ? (
        <ClerkTOCItems emptyText={emptyText} {...props} />
      ) : (
        <TOCItems emptyText={emptyText} {...props} />
      )}
    </TOCScrollArea>
  )
}
