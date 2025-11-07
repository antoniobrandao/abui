# Agnostic Timeline Component - Usage Guide

## Overview

`timeline-view-agnostic.tsx` is a **domain-agnostic, reusable timeline component** built following [Vercel components.build](https://github.com/vercel/components.build) architecture principles.

It provides drag-and-drop scheduling functionality for ANY use case - not just restaurant bookings.

---

## Architecture Classification

According to components.build taxonomy:

- **Type:** Block (opinionated composition solving timeline scheduling)
- **Distribution:** Copy-and-paste (source distribution)
- **Pattern:** Compound components with Context
- **Styling:** Styled with override support via data-attributes

---

## Component Hierarchy

```tsx
<TimelineProvider>          // Context provider, configuration
  <Timeline>                // DnD container, main grid
    <TimelineHeader />      // Hour markers
    <TimelineGrid>          // Optional layout wrapper
      <TimelineRow>         // Individual row (droppable)
        <TimelineSlot>      // Individual slot (draggable)
          <TimelineSlotLabel />    // Primitive: label
          <TimelineSlotContent />  // Primitive: content
        </TimelineSlot>
      </TimelineRow>
    </TimelineGrid>
    <TimelineDropRegion />  // Visual drop preview
    <TimelineCurrentTime /> // Current time indicator
  </Timeline>
</TimelineProvider>
```

---

## Basic Usage Example

```tsx
import {
  TimelineProvider,
  Timeline,
  TimelineHeader,
  TimelineGrid,
  TimelineRow,
  TimelineSlot,
  TimelineSlotLabel,
  TimelineSlotContent,
  TimelineCurrentTime,
  TimelineSlotData,
  TimelineRowData,
} from "./timeline-view-agnostic"

function MyScheduler() {
  const config = {
    startHour: 9,
    endHour: 17,
    snapIntervalMinutes: 15,
    columnWidth: 120,
  }
  
  const rows: TimelineRowData[] = [
    { id: "1", label: "Room A" },
    { id: "2", label: "Room B" },
  ]
  
  const slots: TimelineSlotData[] = [
    { id: "s1", rowId: "1", startTime: "10:00", duration: 60 },
    { id: "s2", rowId: "2", startTime: "14:30", duration: 90 },
  ]
  
  const handlePositionChange = async (slotId, newTime, newRowId) => {
    console.log(`Slot ${slotId} moved to ${newTime} in row ${newRowId}`)
    // Update your backend
    return true // Return true if successful
  }
  
  const validateDrop = (slotId, newTime, newRowId) => {
    // Your custom validation logic
    return true // Return false to prevent drop
  }
  
  return (
    <TimelineProvider
      config={config}
      percentageInView={100}
      onSlotPositionChange={handlePositionChange}
      onValidateDrop={validateDrop}
      onSlotClick={(slotId) => console.log("Clicked:", slotId)}
    >
      <Timeline slots={slots} rows={rows}>
        <TimelineGrid>
          <TimelineHeader columnLabel="Rooms" />
          
          {rows.map(row => (
            <TimelineRow key={row.id} row={row} slots={slots}>
              {(slot) => (
                <TimelineSlot slot={slot}>
                  <TimelineSlotLabel>Event {slot.id}</TimelineSlotLabel>
                  <TimelineSlotContent>
                    <span>👤 Attendees</span>
                    <span>🕐 {slot.startTime}</span>
                  </TimelineSlotContent>
                </TimelineSlot>
              )}
            </TimelineRow>
          ))}
          
          <TimelineCurrentTime />
        </TimelineGrid>
      </Timeline>
    </TimelineProvider>
  )
}
```

---

## Props API Reference

### TimelineProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `TimelineConfig` | **required** | Timeline configuration (hours, snap interval) |
| `percentageInView` | `number` | `100` | Zoom level (100 = full view, 50 = 2x zoom) |
| `onSlotPositionChange` | `function` | - | Called when slot is dropped. Return Promise<boolean> |
| `onValidateDrop` | `function` | - | Real-time validation during drag. Return boolean |
| `onSlotClick` | `function` | - | Called when slot is clicked |
| `style` | `CSSProperties` | - | CSS custom properties |
| `className` | `string` | - | Additional classes |

**TimelineConfig:**
```tsx
{
  startHour: number        // e.g., 9 for 9:00 AM
  endHour: number          // e.g., 17 for 5:00 PM
  snapIntervalMinutes?: number  // Default: 15
  columnWidth?: number     // Default: 112px
}
```

### Timeline

| Prop | Type | Description |
|------|------|-------------|
| `slots` | `TimelineSlotData[]` | All slots to display |
| `rows` | `TimelineRowData[]` | All rows to display |
| `children` | `ReactNode` | Timeline content |
| `className` | `string` | Grid container classes |

### TimelineRow

| Prop | Type | Description |
|------|------|-------------|
| `row` | `TimelineRowData` | Row data |
| `slots` | `TimelineSlotData[]` | Slots array (auto-filtered) |
| `children` | `(slot) => ReactNode` | Render function for slots |
| `className` | `string` | Row classes |
| `asChild` | `boolean` | Polymorphic component |

### TimelineSlot

| Prop | Type | Description |
|------|------|-------------|
| `slot` | `TimelineSlotData` | Slot data |
| `children` | `ReactNode` | Slot content |
| `className` | `string` | Slot classes |
| `asChild` | `boolean` | Polymorphic component |

---

## Advanced Usage

### Custom Styling with Data Attributes

```tsx
<TimelineSlot
  className={cn(
    // Base styles
    "bg-blue-500 text-white",
    // State-based styling
    "data-[state=dragging]:opacity-50",
    "data-[active=true]:ring-2",
    // Conditional
    slot.priority === "high" && "border-2 border-red-500"
  )}
>
  {/* content */}
</TimelineSlot>
```

### Using CSS Custom Properties

```tsx
<TimelineProvider
  config={config}
  style={{
    "--timeline-column-width": "200px",
    "--timeline-row-height": "4rem",
    "--timeline-slot-border-radius": "0.5rem",
  }}
>
  {/* ... */}
</TimelineProvider>

// In your CSS or className
<TimelineSlot className="h-[var(--timeline-row-height)]" />
```

### Complex Validation Logic

```tsx
const validateDrop = (slotId, newTime, newRowId) => {
  const slot = slots.find(s => s.id === slotId)
  const targetRow = rows.find(r => r.id === newRowId)
  
  // Example: Check room capacity
  if (slot.attendees > targetRow.capacity) {
    return false
  }
  
  // Example: Check time conflicts
  const conflicts = slots.filter(s => 
    s.rowId === newRowId &&
    s.id !== slotId &&
    timeRangesOverlap(s.startTime, s.duration, newTime, slot.duration)
  )
  
  return conflicts.length === 0
}
```

### Polymorphic Slots (asChild pattern)

```tsx
<TimelineSlot slot={slot} asChild>
  <a href={`/event/${slot.id}`}>
    <TimelineSlotLabel>{slot.title}</TimelineSlotLabel>
    <TimelineSlotContent>{slot.description}</TimelineSlotContent>
  </a>
</TimelineSlot>
```

---

## Real-World Use Cases

### 1. Restaurant Table Booking

```tsx
const rows = tables.map(table => ({
  id: table.nanoid,
  label: table.name,
  seats: table.seats,
}))

const slots = bookings.map(booking => ({
  id: booking._id,
  rowId: booking.table_nanoids[0],
  startTime: booking.time,
  duration: 90,
  customerName: booking.customer_name,
  partySize: booking.party_size,
  status: booking.status,
}))

<TimelineRow row={row} slots={slots}>
  {(slot) => (
    <TimelineSlot slot={slot} className={getStatusColor(slot.status)}>
      <TimelineSlotLabel>{slot.customerName}</TimelineSlotLabel>
      <TimelineSlotContent>
        <Users className="w-3 h-3" /> {slot.partySize}
        <Clock className="w-3 h-3" /> {slot.startTime}
      </TimelineSlotContent>
    </TimelineSlot>
  )}
</TimelineRow>
```

### 2. Meeting Room Scheduler

```tsx
const rows = rooms.map(room => ({
  id: room.id,
  label: room.name,
  floor: room.floor,
  capacity: room.capacity,
}))

const slots = meetings.map(meeting => ({
  id: meeting.id,
  rowId: meeting.roomId,
  startTime: meeting.startTime,
  duration: meeting.durationMinutes,
  title: meeting.title,
  organizer: meeting.organizer,
}))
```

### 3. Employee Shift Scheduling

```tsx
const rows = employees.map(emp => ({
  id: emp.id,
  label: emp.name,
  role: emp.role,
}))

const slots = shifts.map(shift => ({
  id: shift.id,
  rowId: shift.employeeId,
  startTime: shift.startTime,
  duration: shift.durationMinutes,
  type: shift.type, // "morning", "afternoon", "night"
}))
```

### 4. Vehicle/Equipment Scheduling

```tsx
const rows = vehicles.map(vehicle => ({
  id: vehicle.id,
  label: `${vehicle.make} ${vehicle.model}`,
  licensePlate: vehicle.plate,
}))

const slots = rentals.map(rental => ({
  id: rental.id,
  rowId: rental.vehicleId,
  startTime: rental.pickupTime,
  duration: rental.durationMinutes,
  customer: rental.customerName,
}))
```

---

## Data Attributes Reference

All components expose `data-slot` and `data-state` attributes for styling:

### data-slot Values

- `timeline-wrapper` - Root provider wrapper
- `timeline-grid` - Main scrollable container
- `timeline-header` - Header row
- `timeline-header-column` - Left column in header
- `timeline-header-markers` - Hour markers container
- `timeline-hour-marker` - Individual hour label
- `timeline-row` - Row container
- `timeline-row-label` - Row label column
- `timeline-row-grid` - Row timeline area
- `timeline-grid-line-hour` - Hour grid lines
- `timeline-grid-line-quarter` - 15-min grid lines
- `timeline-slot` - Individual slot
- `timeline-slot-label` - Slot label primitive
- `timeline-slot-content` - Slot content primitive
- `timeline-drag-preview` - Drag overlay preview
- `timeline-mouse-indicator` - Mouse time indicator
- `timeline-drop-region` - Drop zone highlight
- `timeline-current-time` - Current time line

### data-state Values

**TimelineRow:**
- `idle` - Normal state
- `hover-valid` - Valid drop target
- `hover-invalid` - Invalid drop target

**TimelineSlot:**
- `idle` - Normal state
- `dragging` - Being dragged

**DragPreview:**
- `valid` - Valid drop position
- `invalid` - Invalid drop position

---

## CSS Custom Properties

The component exposes these CSS variables:

```css
--timeline-column-width: 112px;
--timeline-width: (calculated);
--timeline-pixels-per-minute: (calculated);
--slot-start-time: "14:30";
--slot-duration: "90min";
```

### Custom Styling Example

```tsx
<TimelineProvider
  style={{
    "--timeline-column-width": "200px",
  }}
>
  <Timeline
    className="[&_[data-slot=timeline-slot]]:rounded-lg"
  >
    {/* Target all slots globally */}
  </Timeline>
</TimelineProvider>
```

---

## Integration Pattern

```tsx
// Your domain-specific component
function BookingTimeline() {
  const [bookings, setBookings] = useState(...)
  const [tables, setTables] = useState(...)
  
  // Transform to agnostic format
  const rows = tables.map(adaptTableToRow)
  const slots = bookings.map(adaptBookingToSlot)
  
  // Domain-specific logic
  const validateBookingDrop = (slotId, newTime, newRowId) => {
    // Your business rules
    return checkTimeConflicts(slotId, newTime, newRowId) &&
           checkTableCapacity(slotId, newRowId)
  }
  
  const handleBookingMove = async (slotId, newTime, newRowId) => {
    // Your API call
    const response = await updateBooking(slotId, { time: newTime, tableId: newRowId })
    if (response.success) {
      setBookings(response.bookings)
      return true
    }
    return false
  }
  
  return (
    <TimelineProvider
      config={{ startHour: 12, endHour: 23 }}
      onSlotPositionChange={handleBookingMove}
      onValidateDrop={validateBookingDrop}
    >
      <Timeline slots={slots} rows={rows}>
        {/* Your custom layout */}
      </Timeline>
    </TimelineProvider>
  )
}
```

---

## Key Features

### ✅ What's Included (In Component)

1. **Drag & Drop Logic**
   - Mouse/touch sensor configuration
   - Drag start/over/move/end handlers
   - Transform calculations

2. **Time Snapping**
   - Configurable snap intervals (default 15min)
   - Smooth magnetic snapping during drag
   - Time range clamping

3. **Visual Indicators**
   - Mouse position tracker with time display
   - Current time line (auto-updating)
   - Drop region highlight (yellow zone)

4. **Grid Rendering**
   - Hour markers
   - Quarter-hour grid lines
   - Responsive width calculation

5. **State Management**
   - Active slot tracking
   - Hover state tracking
   - Dragged time tracking

### ❌ What's External (Host Responsibility)

1. **Business Logic**
   - Collision detection rules
   - Capacity checks
   - Status management
   - Data fetching

2. **Styling Content**
   - Slot colors (based on status/priority)
   - Custom icons/badges
   - Row decorations

3. **Data Transformation**
   - Converting domain models to TimelineSlotData
   - Converting domain models to TimelineRowData

---

## Comparison: Current vs Agnostic

### Current Implementation (Bookings-Specific)

```tsx
<BookingSlot booking={booking}>
  <div>Antonio</div>
  <div>👥 2 🕐 13:00</div>
</BookingSlot>
```

**Problems:**
- Hardcoded to bookings domain
- Can't reuse for other scheduling needs
- Styling mixed with logic

### Agnostic Implementation

```tsx
<TimelineSlot slot={slot}>
  <TimelineSlotLabel>{slot.customerName}</TimelineSlotLabel>
  <TimelineSlotContent>
    <Users /> {slot.partySize}
    <Clock /> {slot.startTime}
  </TimelineSlotContent>
</TimelineSlot>
```

**Benefits:**
- Works for ANY domain (meetings, shifts, rentals, etc.)
- Host controls all content/styling
- Primitives for composition
- Can be published as reusable library

---

## Migration Guide

To migrate from current booking timeline to agnostic component:

### Step 1: Adapt Data

```tsx
// Old
const bookings: BookingInterface[]
const tables: RestaurantTable[]

// New
const slots: TimelineSlotData[] = bookings.map(b => ({
  id: b._id!,
  rowId: b.table_nanoids[0],
  startTime: b.time,
  duration: 90,
  // Preserve all booking data
  _originalBooking: b,
}))

const rows: TimelineRowData[] = tables.map(t => ({
  id: t.nanoid,
  label: t.name,
  // Preserve all table data
  _originalTable: t,
}))
```

### Step 2: Extract Business Logic

```tsx
const validateDrop = (slotId, newTime, newRowId) => {
  const slot = slots.find(s => s.id === slotId)
  const booking = slot._originalBooking
  const table = rows.find(r => r.id === newRowId)._originalTable
  
  // Your existing logic
  return checkTimeCollisions(booking, newTime, newRowId) &&
         table.seats >= booking.party_size
}
```

### Step 3: Replace Component

```tsx
// Old
<TimelineView
  currentDayBookings={bookings}
  activeTables={tables}
  // ... many props
/>

// New
<TimelineProvider config={config} onValidateDrop={validateDrop}>
  <Timeline slots={slots} rows={rows}>
    {/* Custom layout */}
  </Timeline>
</TimelineProvider>
```

---

## Best Practices

### DO ✅

1. **Keep slot data minimal** - Only include IDs and positioning
2. **Store original data separately** - Use `_original*` pattern for domain data
3. **Validate in host** - Business rules belong in parent component
4. **Use data-attributes** - For all state-based styling
5. **Provide callbacks** - Don't hide API calls in component
6. **Use asChild** - For polymorphic behavior (links, buttons, etc.)

### DON'T ❌

1. **Don't add domain logic** - Keep component generic
2. **Don't hardcode colors** - Let host provide via children
3. **Don't fetch data** - Always receive via props
4. **Don't assume types** - Keep interfaces flexible
5. **Don't hide validation** - Expose via callbacks

---

## Accessibility

Current implementation is **low-level a11y**:
- ✅ Keyboard dragging works (via @dnd-kit)
- ✅ Semantic HTML where possible
- ❌ Not optimized for screen readers (by design)
- ❌ No TAB navigation (visual-only interface)

To enhance:
- Add `aria-label` to slots
- Add `role="grid"` to timeline
- Add keyboard shortcuts for common actions

---

## Performance Considerations

1. **Memoize row rendering:**
```tsx
const rowComponents = useMemo(() => 
  rows.map(row => <TimelineRow key={row.id} row={row} slots={slots}>...)
, [rows, slots])
```

2. **Virtualize rows** for 100+ rows:
```tsx
import { useVirtualizer } from '@tanstack/react-virtual'
```

3. **Debounce validation** for expensive checks:
```tsx
const validateDrop = useMemo(() => 
  debounce((slotId, newTime, newRowId) => { ... }, 100)
, [slots])
```

---

## Testing

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('calls onSlotClick when slot is clicked', async () => {
  const handleClick = jest.fn()
  
  render(
    <TimelineProvider config={config} onSlotClick={handleClick}>
      <Timeline slots={slots} rows={rows}>
        {/* ... */}
      </Timeline>
    </TimelineProvider>
  )
  
  const slot = screen.getByText('Event s1')
  await userEvent.click(slot)
  
  expect(handleClick).toHaveBeenCalledWith('s1')
})
```

---

## Future Enhancements

Possible additions while maintaining agnosticism:

1. **Multi-select** - Drag multiple slots at once
2. **Resize handles** - Adjust duration by dragging edges
3. **Zoom controls** - Built-in zoom UI (optional)
4. **Mini-map** - Overview navigation for long timelines
5. **Keyboard shortcuts** - Arrow keys to move slots
6. **Undo/redo** - Action history management
7. **Conflict highlighting** - Visual markers for overlaps
8. **Time zones** - Support for multi-timezone display

All can be added via **optional props** without breaking existing usage!

---

## License & Distribution

This component follows the **copy-and-paste** (source distribution) model:

- ✅ Copy the file into your project
- ✅ Customize as needed
- ✅ No external dependency (besides @dnd-kit, Radix Slot)
- ✅ Full ownership
- ✅ Zero runtime overhead

**Perfect for:**
- Companies building custom scheduling tools
- SaaS products with timeline features
- Internal tools
- Rapid prototyping

---

## Support

**Component follows these specifications:**
- [components.build - Definitions](https://raw.githubusercontent.com/vercel/components.build/refs/heads/main/content/docs/definitions.mdx)
- [components.build - Data Attributes](https://raw.githubusercontent.com/vercel/components.build/refs/heads/main/content/docs/data-attributes.mdx)

**Built with:**
- [@dnd-kit/core](https://docs.dndkit.com/) - Drag and drop
- [@radix-ui/react-slot](https://www.radix-ui.com/primitives/docs/utilities/slot) - Polymorphic components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [class-variance-authority](https://cva.style/docs) - Variant management (if needed)

