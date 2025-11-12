# Component Architecture Guide

Based on [Vercel components.build](https://github.com/vercel/components.build) specification.

## Artifact Taxonomy

### 1. Primitive (Unstyled Component)

**The lowest-level building block** that provides behavior and accessibility without styling.

**Characteristics:**

- Completely headless (unstyled)
- Encapsulates semantics, focus management, keyboard interaction
- Handles ARIA wiring, portals, measurement
- Single responsibility, highly composable

**Examples:**

- Radix UI Primitives (Dialog, Popover, Tooltip)
- React Aria Components
- Headless UI

**Expectations:**

- Zero styling
- Exhaustive a11y behavior
- Stable versioning
- Framework-agnostic behavior patterns

---

### 2. Component

**A styled, reusable UI unit** that adds visual design to primitives.

**Characteristics:**

- Wraps unstyled primitives with default styling
- Still relatively low-level but immediately usable
- Remains customizable and override-friendly

**Examples:**

- shadcn/ui components (styled Radix primitives)
- Material UI components
- Our `BookingSlot`, `TimelineHeader`

**Expectations:**

- Clear props API
- Supports controlled/uncontrolled usage
- Default styling with override support (className, tokens, slots)
- Keyboard accessible & screen-reader friendly
- Composable (children/slots, render props, compound subcomponents)

---

### 3. Pattern

**Specific compositions** that solve UI/UX problems (documentation-focused).

**Examples:**

- Form validation with inline errors
- Confirming destructive actions
- Typeahead search
- Optimistic UI updates

**Our Implementation:**

- Drag-and-drop timeline scheduling
- 15-minute time snapping
- Collision detection for bookings

---

### 4. Block

**Production-ready compositions** solving concrete use cases with content scaffolding.

**Characteristics:**

- Opinionated, copy-paste friendly
- Strong defaults, minimal logic
- Domain logic stubbed via handlers
- Trades generality for adoption speed

**Examples:**

- Pricing table
- Auth screens
- Onboarding stepper
- AI chat panel

**Our Implementation:**

- `BookingDetailsSheet` - Opinionated booking management interface
- `TimelineView` - Complete drag-and-drop timeline grid

**Expectations:**

- Easily branded/themed
- Accepts data via props (never hides data behind internal fetches)
- Not imported as dependency - copied and customized

---

### 5. Page

**Complete single-route view** composed of multiple blocks.

**Examples:**

- Landing page (hero + features + pricing + footer)
- Dashboard page (stats + charts + activity feed)

**Our Implementation:**

- `BookingsTimelineView` - Complete bookings timeline page

---

### 6. Template

**Multi-page collection** with routing, layouts, providers, and project structure.

**Examples:**

- SaaS starters
- E-commerce templates

**Expectations:**

- Multiple pages with routing
- Global configuration (themes, auth, layouts)
- Opinionated structure
- Fork and customize, not imported

---

## Data Attributes for Styling

### The Problem: Prop Explosion

❌ **Anti-pattern:**

```tsx
<Dialog openClassName="bg-black" closedClassName="bg-white" classes={{ open: "opacity-100", closed: "opacity-0" }} />
```

### The Solution: data-state

✅ **Better approach:**

```tsx
const Dialog = ({ className, ...props }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return <div data-state={isOpen ? "open" : "closed"} className={cn("transition-all", className)} {...props} />
}

// Usage
;<Dialog className="data-[state=open]:opacity-100 data-[state=closed]:opacity-0" />
```

### Benefits:

1. **Single className prop** - No state-specific props needed
2. **Composable** - Combine multiple data attributes
3. **Standard CSS** - Works everywhere
4. **Type-safe** - TypeScript can infer values
5. **Inspectable** - Visible in DevTools

---

## Common State Patterns

### data-state for Component States

```tsx
// Open/closed
<Accordion data-state={isOpen ? 'open' : 'closed'} />

// Selected
<Tab data-state={isSelected ? 'active' : 'inactive'} />

// Disabled
<Button data-disabled={isDisabled} disabled={isDisabled} />

// Loading
<Button data-loading={isLoading} />

// Orientation
<Slider data-orientation="horizontal" />

// Position
<Tooltip data-side="top" />
```

### Styling with Tailwind

```tsx
<Dialog
  className={cn(
    "rounded-lg border p-4",
    "data-[state=open]:animate-in data-[state=open]:fade-in",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out",
    "data-[state=open][data-side=top]:slide-in-from-top-2", // Combine attributes
  )}
/>
```

---

## data-slot for Component Identification

### The Problem: Targeting Nested Components

**Without data-slot:**

```tsx
// Fragile - breaks if DOM changes
.parent > div > button { ... }

// Over-specific
.dialog .submit-button { ... }
```

### The Solution: data-slot

```tsx
const Dialog = () => (
  <div data-slot="dialog">
    <div data-slot="dialog-header">
      <h2>Title</h2>
      <button data-slot="dialog-close">×</button>
    </div>
    <div data-slot="dialog-content">{children}</div>
    <div data-slot="dialog-footer">
      <button data-slot="dialog-cancel">Cancel</button>
      <button data-slot="dialog-submit">Submit</button>
    </div>
  </div>
)
```

**Usage:**

```tsx
// Target specific slots
<Dialog className="[&_[data-slot=dialog-submit]]:w-full" />

// Global CSS
[data-slot="dialog-submit"] {
  @apply bg-primary text-white;
}
```

### data-slot Naming Conventions:

1. **Use kebab-case** - `data-slot="form-field"` ✅ not `data-slot="formField"` ❌
2. **Be specific** - `data-slot="submit-button"` ✅ not `data-slot="button"` ❌
3. **Match purpose** - What it does, not how it looks
4. **Avoid implementation** - `data-slot="user-avatar"` ✅ not `data-slot="rounded-image"` ❌

**Good examples:**

- `data-slot="search-input"`
- `data-slot="navigation-menu"`
- `data-slot="error-message"`
- `data-slot="card-header"`

---

## Controlled vs Uncontrolled Components

### Controlled Component

**Value driven by props**, parent owns state:

```tsx
const Input = ({ value, onChange }: ControlledInputProps) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

// Usage
const [value, setValue] = useState('')
<Input value={value} onChange={setValue} />
```

### Uncontrolled Component

**Holds internal state**, parent optionally sets default:

```tsx
const Input = ({ defaultValue }: UncontrolledInputProps) => {
  const [value, setValue] = useState(defaultValue || "")

  return <input value={value} onChange={e => setValue(e.target.value)} />
}

// Usage
;<Input defaultValue="hello" />
```

### Best Practice: Support Both

```tsx
const Input = ({ value: controlledValue, defaultValue, onChange }: InputProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || "")
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  return <input value={value} onChange={e => handleChange(e.target.value)} />
}
```

---

## When to Use What

### `data-state` use cases:

- Visual states (open/closed, active/inactive, loading)
- Layout states (orientation, side, alignment)
- Interaction states (hover, focus, disabled when styling children)

### `data-slot` use cases:

- Component identification (stable identifiers)
- Composition patterns (parent-child relationships)
- Global styling (theme-wide component styling)
- Variant-independent targeting

### `props` use cases:

- Variants (primary, secondary, destructive)
- Sizes (sm, md, lg)
- Behavioral configuration (controlled/uncontrolled)
- Event handlers (onClick, onChange)

---

## Combined Approach Example

```tsx
type ButtonProps = {
  variant?: "primary" | "secondary" | "destructive"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
}

const Button = ({ variant = "primary", size = "md", loading, disabled, className, ...props }: ButtonProps) => {
  return (
    <button
      data-slot="button" // Slot for targeting
      data-loading={loading} // State for styling
      data-disabled={disabled} // State for styling
      className={cn(
        buttonVariants({ variant, size }), // Variant styles via props
        className, // Additional overrides
      )}
      disabled={disabled}
      {...props}
    />
  )
}
```

**Multi-faceted styling:**

```tsx
// Variants via props
<Button variant="primary" size="lg">Submit</Button>

// Parent targeting via data-slot
<form className="[&_[data-slot=button]]:w-full">
  <Button>Submit</Button>
</form>

// State-based styling
<Button
  loading={isLoading}
  className="data-[loading=true]:opacity-50"
>
  Submit
</Button>
```

---

## Our Timeline Implementation Analysis

### Current Architecture:

**Primitives (from dependencies):**

- `@dnd-kit/core` - Drag and drop primitives
- Radix UI primitives (via shadcn) - Sheet, Select, Button

**Components:**

- `BookingSlot` ✅ - Styled, reusable booking visualization
- `TimelineHeader` ✅ - Styled header with hour markers
- `ZoomControls` ✅ - Styled zoom interface
- `StatusLegend` ✅ - Styled status indicators

**Blocks:**

- `TimelineView` ✅ - Opinionated drag-and-drop timeline grid
- `BookingDetailsSheet` ✅ - Opinionated booking management

**Page:**

- `BookingsTimelineView` ✅ - Complete timeline page with controls

**Orchestrator:**

- `View.tsx` ✅ - Connects blocks with state management

### Opportunities for Improvement:

1. **Add data-state attributes** to `BookingSlot`:

   ```tsx
   <div data-state={booking.status.toLowerCase()} data-dragging={isDragging} data-collision={hasCollision} />
   ```

2. **Add data-slot attributes** for targeted styling:

   ```tsx
   <div data-slot="booking-slot" />
   <div data-slot="timeline-row" />
   <div data-slot="time-indicator" />
   ```

3. **Clearer separation** between controlled/uncontrolled:
   - `percentageInView` could support both controlled & uncontrolled modes
   - `selectedCapacityWindow` could be controllable from outside

---

## Key Takeaways

1. **Primitives** = Behavior without style (use libraries)
2. **Components** = Styled, reusable UI units
3. **Blocks** = Opinionated compositions (copy-paste, customize)
4. **Use `data-state`** for styling based on component state
5. **Use `data-slot`** for stable component targeting
6. **Use `props`** for variants, sizes, and behavior
7. **Support both** controlled and uncontrolled modes when applicable

---

---

## Advanced Patterns (from shadcn/ui Sidebar)

### Compound Components with Context

**Pattern:** Multiple related components sharing state via Context.

```tsx
// Provider manages shared state
const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function SidebarProvider({ children, defaultOpen = true, open, onOpenChange }) {
  const [_open, _setOpen] = useState(defaultOpen)
  const isControlled = open !== undefined
  const currentOpen = isControlled ? open : _open

  const setOpen = value => {
    if (isControlled) {
      onOpenChange?.(value)
    } else {
      _setOpen(value)
    }
  }

  return <SidebarContext.Provider value={{ open: currentOpen, setOpen }}>{children}</SidebarContext.Provider>
}

// Child components consume context
function SidebarTrigger() {
  const { toggleSidebar } = useSidebar()
  return <button onClick={toggleSidebar}>Toggle</button>
}
```

**Benefits:**

- Components work together seamlessly
- No prop drilling
- Can be used independently or together
- Each component has focused responsibility

**Our Usage:**

- Could apply to: `Timeline` + `TimelineRow` + `TimelineSlot` sharing drag state
- Could apply to: `BookingCard` + `BookingStatus` + `BookingActions` sharing booking data

---

### The asChild Pattern (Polymorphic Components)

**Pattern:** Allow consumers to change the underlying element while preserving behavior.

```tsx
import { Slot } from "@radix-ui/react-slot"

function Button({ asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button"
  return <Comp {...props} />
}

// Usage - renders as button
<Button onClick={handleClick}>Click me</Button>

// Usage - renders as Link but with button styling/behavior
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

**Why It's Powerful:**

- Preserves all props/className/data-attributes
- Enables composition with routing libraries
- Maintains accessibility regardless of element
- No wrapper divs needed

**Our Application:**

```tsx
// Could enhance BookingSlot to support asChild
<BookingSlot asChild>
  <a href={`/booking/${booking.id}`}>{/* Slot content */}</a>
</BookingSlot>
```

---

### CSS Custom Properties as Component API

**Pattern:** Use CSS variables for runtime theming/configuration.

```tsx
function Sidebar({ variant, style, ...props }) {
  return (
    <div
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "3rem",
          ...style,
        } as React.CSSProperties
      }
      data-variant={variant}
      className="w-[var(--sidebar-width)]"
    />
  )
}
```

**In CSS/Tailwind:**

```tsx
className={cn(
  "w-[var(--sidebar-width)]",
  "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]"
)}
```

**Benefits:**

- Dynamic values without JavaScript calculations
- Easy theming via CSS variable overrides
- Works with Tailwind's arbitrary values
- Can be inherited down component tree

**Our Application:**

```tsx
// TimelineView could expose:
<TimelineView
  style={{
    "--timeline-row-height": "4rem",
    "--timeline-slot-min-width": "8rem",
    "--timeline-grid-color": "hsl(var(--border))",
  }}
/>
```

---

### Group Data Selectors

**Pattern:** Parent state affecting child styling via `group-data-*` utilities.

```tsx
<div className="group" data-state="collapsed" data-variant="floating">
  <button className="group-data-[state=collapsed]:opacity-50" />
  <div className="group-data-[variant=floating]:shadow-lg" />

  {/* Combine multiple conditions */}
  <span className="group-data-[state=collapsed]:group-data-[variant=floating]:hidden" />
</div>
```

**Complex Selectors:**

```tsx
// Has syntax - target if parent has specific data attribute
className = "has-data-[variant=inset]:bg-sidebar"

// Peer syntax - target based on sibling
className = "peer-data-[state=collapsed]:ml-0"

// Nested groups
className = "group/sidebar-wrapper"
className = "group-data-[collapsible=icon]/sidebar-wrapper:hidden"
```

**Our Implementation:**

```tsx
// Could use in TimelineView
<div className="group" data-state={isDragging ? "dragging" : "idle"}>
  <TimelineRow className="group-data-[state=dragging]:opacity-50" />
  <TimelineIndicator className="group-data-[state=dragging]:visible" />
</div>
```

---

### Dual Data Attributes Strategy

**Pattern:** Use BOTH `data-sidebar` and `data-slot` for different purposes.

```tsx
<div
  data-sidebar="menu-button" // For component-specific logic/queries
  data-slot="sidebar-menu-button" // For stable styling/targeting
  data-state="active" // For state-based styling
  data-size="lg" // For variant-based styling
/>
```

**When to use each:**

**data-sidebar:**

- Internal component identification
- JavaScript queries (`querySelectorAll('[data-sidebar="menu-item"]')`)
- Component-specific behavior
- Can change between versions

**data-slot:**

- Public API for styling
- Stable across versions
- Documentation and examples reference these
- Consumer styling targets

**data-state:**

- Visual state changes
- Animation triggers
- Conditional styling

**data-[variant]:**

- Expose variant props as data attributes
- Enables complex conditional styling
- Example: `data-size`, `data-variant`, `data-orientation`

---

### Controlled + Uncontrolled Pattern

**Perfect implementation:**

```tsx
function Component({ value: controlledValue, defaultValue = "", onValueChange }: ComponentProps) {
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState(defaultValue)

  // Determine if controlled
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const setValue = (newValue: string) => {
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalValue(newValue)
    }
    // Always call onChange (even in controlled mode)
    onValueChange?.(newValue)
  }

  return <input value={value} onChange={e => setValue(e.target.value)} />
}
```

**Usage:**

```tsx
// Uncontrolled - component manages its own state
<Input defaultValue="hello" onValueChange={(v) => console.log(v)} />

// Controlled - parent manages state
const [value, setValue] = useState("hello")
<Input value={value} onValueChange={setValue} />
```

**Our Components that could benefit:**

- `percentageInView` in BookingsTimelineView (could be controlled from outside)
- `selectedCapacityWindow` (could support defaultCapacityWindow + onCapacityWindowChange)

---

## Accessibility Patterns from Sidebar

### 1. Screen Reader Only Content

```tsx
<span className="sr-only">Toggle Sidebar</span>
```

### 2. ARIA Labeling

```tsx
<button aria-label="Toggle Sidebar" />
```

### 3. Keyboard Shortcuts

```tsx
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      toggleSidebar()
    }
  }
  window.addEventListener("keydown", handleKeyDown)
  return () => window.removeEventListener("keydown", handleKeyDown)
}, [toggleSidebar])
```

### 4. Focus Management

```tsx
// Hidden from keyboard navigation but visible
<div tabIndex={-1} />
```

---

## Styling Patterns

### 1. Arbitrary Values with CSS Variables

```tsx
className = "w-[var(--sidebar-width)]"
className = "h-[calc(var(--sidebar-width-icon)+var(--spacing-4))]"
```

### 2. Modifier Stacking

```tsx
className={cn(
  "hover:bg-accent",
  "focus-visible:ring-2",
  "active:bg-accent",
  "disabled:opacity-50",
  "data-[active=true]:bg-accent",
  "data-[state=open]:hover:bg-accent"
)}
```

### 3. Child Selectors

```tsx
className = "[&>svg]:size-4 [&>svg]:shrink-0"
className = "[&>span:last-child]:truncate"
```

### 4. Peer + Group Combinations

```tsx
<button className="peer/menu-button" data-size="lg" />
<div className="peer-data-[size=lg]/menu-button:top-2.5" />
```

---

---

## Real-World Example: Sidebar Component Breakdown

Based on `src/components/ui/sidebar.tsx` - a perfect implementation of these patterns.

### Key Learnings:

**1. Multiple Data Attributes for Different Purposes:**

```tsx
<div
  data-slot="sidebar" // Public styling API (stable)
  data-sidebar="sidebar" // Internal identification (can change)
  data-state={state} // Visual state (expanded/collapsed)
  data-variant={variant} // Layout variant (sidebar/floating/inset)
  data-side={side} // Positioning (left/right)
  data-collapsible={collapsible} // Behavior mode (offcanvas/icon/none)
/>
```

**2. Expose Variant Props as Data Attributes:**

```tsx
// Props
<SidebarMenuButton size="lg" isActive={true} />

// Becomes data attributes
<button
  data-size="lg"
  data-active={true}
  className="data-[active=true]:bg-accent data-[size=lg]:h-12"
/>
```

Why? Enables styling based on component state without className props explosion.

**3. CSS Custom Properties for Constants:**

```tsx
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_ICON = "3rem"

<div
  style={{
    "--sidebar-width": SIDEBAR_WIDTH,
    "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
  } as React.CSSProperties}
  className="w-[var(--sidebar-width)]"
/>
```

**4. Group Variants with Named Groups:**

```tsx
<div className="group/sidebar-wrapper" data-state="collapsed">
  <button className="group-data-[state=collapsed]/sidebar-wrapper:w-12" />
</div>

<button className="peer/menu-button" data-size="lg" />
<div className="peer-data-[size=lg]/menu-button:top-2.5" />
```

**5. Controlled + Uncontrolled with Cookie Persistence:**

```tsx
function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange }) {
  const [_open, _setOpen] = useState(defaultOpen)
  const open = openProp ?? _open

  const setOpen = useCallback(
    value => {
      const newValue = typeof value === "function" ? value(open) : value

      if (onOpenChange) {
        onOpenChange(newValue) // Controlled mode
      } else {
        _setOpen(newValue) // Uncontrolled mode
      }

      // Persist to cookie
      document.cookie = `sidebar_state=${newValue}; path=/; max-age=604800`
    },
    [onOpenChange, open],
  )
}
```

**6. Keyboard Shortcuts:**

```tsx
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      toggleSidebar()
    }
  }
  window.addEventListener("keydown", handleKeyDown)
  return () => window.removeEventListener("keydown", handleKeyDown)
}, [toggleSidebar])
```

**7. Responsive with isMobile Hook:**

```tsx
function Sidebar() {
  const { isMobile } = useSidebar()

  if (isMobile) {
    return <Sheet>...</Sheet> // Mobile: use sheet
  }

  return <div>...</div> // Desktop: use sidebar
}
```

---

## Component Composition Checklist

When building a new component, ensure:

- [ ] **Data attributes** for all states (`data-state`)
- [ ] **Data slot** for targeting (`data-slot="component-name"`)
- [ ] **Expose variant props** as data attributes (`data-size`, `data-variant`)
- [ ] **Controlled + Uncontrolled** support where applicable
- [ ] **TypeScript types** exported and documented
- [ ] **Accessibility** (ARIA, keyboard shortcuts, focus management, sr-only labels)
- [ ] **CSS variables** for themeable values (`--component-width`, etc.)
- [ ] **Variants** via cva when multiple styles needed
- [ ] **asChild support** for polymorphism (use `@radix-ui/react-slot`)
- [ ] **Context** for compound components (if applicable)
- [ ] **Custom hook** for consuming context (`useComponent`)
- [ ] **Forward refs** for DOM access
- [ ] **className override** support via cn()
- [ ] **Semantic HTML** (button vs div, etc.)
- [ ] **Group/Peer selectors** for parent-child styling
- [ ] **Mobile-responsive** variants (if applicable)

---

## Our Timeline: Architecture Assessment

### ✅ What We Did Well

**1. Compound Components:**

- `TimelineView` + `TimelineRow` + `BookingSlot` work together
- Clear separation of concerns

**2. Callback Props:**

- `onBookingClick` - Clean event delegation
- `onPositionChange` - Agnostic from update logic

**3. Single Responsibility:**

- `TimelineView` - Grid rendering & drag/drop
- `BookingDetailsSheet` - Booking management
- `BookingsTimelineView` - Data fetching & controls

**4. Reusability:**

- `BookingSlot` reused in drag overlay
- Sub-components exported for composition

### 🔄 Could Be Enhanced

**1. Add Data Attributes:**

```tsx
<BookingSlot
  data-slot="booking-slot"
  data-state={booking.status.toLowerCase()}
  data-dragging={isDragging}
  data-collision={hasCollision}
/>
```

**2. Add CSS Variables:**

```tsx
<TimelineView
  style={{
    "--timeline-row-height": "3rem",
    "--timeline-slot-gap": "0.25rem",
  }}
/>
```

**3. Support Controlled Mode:**

```tsx
<BookingsTimelineView
  capacityWindow={controlledWindow} // Controlled
  onCapacityWindowChange={setControlledWindow}
  // OR
  defaultCapacityWindow={window} // Uncontrolled
/>
```

**4. Add asChild to BookingSlot:**

```tsx
<BookingSlot asChild>
  <Link href={`/booking/${booking.id}`} />
</BookingSlot>
```

---

---

## Quick Reference: Data Attribute Patterns

### Common data-state Values

| Component   | States                                                     | Example                  |
| ----------- | ---------------------------------------------------------- | ------------------------ |
| Dialog      | `open`, `closed`                                           | `data-state="open"`      |
| Accordion   | `open`, `closed`                                           | `data-state="closed"`    |
| Tab         | `active`, `inactive`                                       | `data-state="active"`    |
| Checkbox    | `checked`, `unchecked`, `indeterminate`                    | `data-state="checked"`   |
| Sidebar     | `expanded`, `collapsed`                                    | `data-state="collapsed"` |
| Button      | `idle`, `loading`, `success`, `error`                      | `data-state="loading"`   |
| **Booking** | `requested`, `seated`, `completed`, `cancelled`, `no-show` | `data-state="seated"`    |

### Common data-slot Naming

| Purpose         | data-slot                      | CSS Selector                             |
| --------------- | ------------------------------ | ---------------------------------------- |
| Main component  | `data-slot="component-name"`   | `[data-slot="component-name"]`           |
| Header section  | `data-slot="component-header"` | `.parent [data-slot="component-header"]` |
| Footer section  | `data-slot="component-footer"` | `[&_[data-slot="component-footer"]]`     |
| Action button   | `data-slot="component-action"` | Global via data-slot                     |
| Inner container | `data-slot="component-inner"`  | For specific targeting                   |

### Common Modifiers as Data Attributes

```tsx
data-size="sm|md|lg"
data-variant="default|outline|ghost"
data-orientation="horizontal|vertical"
data-side="top|right|bottom|left"
data-align="start|center|end"
data-disabled={boolean}
data-loading={boolean}
data-active={boolean}
```

---

## Pattern Decision Tree

**Building a new UI element? Follow this:**

```
Is it completely unstyled with only behavior?
  └─ YES → It's a PRIMITIVE (use existing like Radix)
  └─ NO  → Continue...

Is it a single styled, reusable element?
  └─ YES → It's a COMPONENT
      ├─ Add data-slot
      ├─ Add data-state for states
      ├─ Use cva for variants
      ├─ Support className override
      └─ Consider asChild pattern

Is it a composition solving a specific use case?
  └─ YES → It's a BLOCK
      ├─ Use compound components
      ├─ Accept data via props
      ├─ Provide callback props
      ├─ Don't hide data fetching
      └─ Make copy-paste friendly

Is it a complete page/route?
  └─ YES → It's a PAGE
      └─ Compose blocks together

Is it multi-page with routing?
  └─ YES → It's a TEMPLATE
      └─ Full application scaffold
```

---

## References

- [Vercel components.build - Definitions](https://raw.githubusercontent.com/vercel/components.build/refs/heads/main/content/docs/definitions.mdx)
- [Vercel components.build - Data Attributes](https://raw.githubusercontent.com/vercel/components.build/refs/heads/main/content/docs/data-attributes.mdx)
- [Vercel components.build - State](https://raw.githubusercontent.com/vercel/components.build/refs/heads/main/content/docs/state.mdx)
- [Vercel components.build - Styling](https://raw.githubusercontent.com/vercel/components.build/refs/heads/main/content/docs/styling.mdx)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Radix UI Slot](https://www.radix-ui.com/primitives/docs/utilities/slot)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [class-variance-authority](https://cva.style/docs)
- [Tailwind CSS - Data Attribute Modifiers](https://tailwindcss.com/docs/hover-focus-and-other-states#data-attributes)
