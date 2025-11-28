import {
  TimelineSteps,
  TimelineStepsConnector,
  TimelineStepsContent,
  TimelineStepsDescription,
  TimelineStepsHeader,
  TimelineStepsIcon,
  TimelineStepsItem,
  TimelineStepsTime,
  TimelineStepsTitle,
} from "@/registry/abui/ui/timeline-steps"

export default function TimelineDemo() {
  return (
    <TimelineSteps>
      <TimelineStepsItem>
        <TimelineStepsConnector />
        <TimelineStepsHeader>
          <TimelineStepsIcon />
          <TimelineStepsTitle>Order placed</TimelineStepsTitle>
        </TimelineStepsHeader>
        <TimelineStepsContent>
          <TimelineStepsDescription>Your order #12345 has been confirmed.</TimelineStepsDescription>
          <TimelineStepsTime dateTime="2024-01-15T10:00:00">Jan 15, 2024 at 10:00 AM</TimelineStepsTime>
        </TimelineStepsContent>
      </TimelineStepsItem>
      <TimelineStepsItem>
        <TimelineStepsConnector />
        <TimelineStepsHeader>
          <TimelineStepsIcon />
          <TimelineStepsTitle>Processing</TimelineStepsTitle>
        </TimelineStepsHeader>
        <TimelineStepsContent>
          <TimelineStepsDescription>Your items are being prepared for shipment.</TimelineStepsDescription>
          <TimelineStepsTime dateTime="2024-01-16T14:30:00">Jan 16, 2024 at 2:30 PM</TimelineStepsTime>
        </TimelineStepsContent>
      </TimelineStepsItem>
      <TimelineStepsItem>
        <TimelineStepsConnector />
        <TimelineStepsHeader>
          <TimelineStepsIcon />
          <TimelineStepsTitle>Shipped</TimelineStepsTitle>
        </TimelineStepsHeader>
        <TimelineStepsContent>
          <TimelineStepsDescription>Your package is on its way.</TimelineStepsDescription>
          <TimelineStepsTime dateTime="2024-01-17T09:15:00">Jan 17, 2024 at 9:15 AM</TimelineStepsTime>
        </TimelineStepsContent>
      </TimelineStepsItem>
    </TimelineSteps>
  )
}
