import { Check, Circle, Package, Truck } from "lucide-react"

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

export default function TimelineWithIcons() {
  return (
    <TimelineSteps>
      <TimelineStepsItem status="completed">
        <TimelineStepsConnector status="completed" />
        <TimelineStepsHeader>
          <TimelineStepsIcon variant="primary">
            <Check />
          </TimelineStepsIcon>
          <TimelineStepsTitle>Order confirmed</TimelineStepsTitle>
        </TimelineStepsHeader>
        <TimelineStepsContent>
          <TimelineStepsDescription>Your order and payment have been received.</TimelineStepsDescription>
          <TimelineStepsTime>2 days ago</TimelineStepsTime>
        </TimelineStepsContent>
      </TimelineStepsItem>
      <TimelineStepsItem status="completed">
        <TimelineStepsConnector status="completed" />
        <TimelineStepsHeader>
          <TimelineStepsIcon variant="primary">
            <Package />
          </TimelineStepsIcon>
          <TimelineStepsTitle>Packed</TimelineStepsTitle>
        </TimelineStepsHeader>
        <TimelineStepsContent>
          <TimelineStepsDescription>Your items have been packed and labeled.</TimelineStepsDescription>
          <TimelineStepsTime>1 day ago</TimelineStepsTime>
        </TimelineStepsContent>
      </TimelineStepsItem>
      <TimelineStepsItem status="current">
        <TimelineStepsConnector status="current" />
        <TimelineStepsHeader>
          <TimelineStepsIcon variant="primary">
            <Truck />
          </TimelineStepsIcon>
          <TimelineStepsTitle>In transit</TimelineStepsTitle>
        </TimelineStepsHeader>
        <TimelineStepsContent>
          <TimelineStepsDescription>Your package is on its way to you.</TimelineStepsDescription>
          <TimelineStepsTime>Now</TimelineStepsTime>
        </TimelineStepsContent>
      </TimelineStepsItem>
      <TimelineStepsItem status="upcoming">
        <TimelineStepsHeader>
          <TimelineStepsIcon variant="outline">
            <Circle />
          </TimelineStepsIcon>
          <TimelineStepsTitle>Delivered</TimelineStepsTitle>
        </TimelineStepsHeader>
        <TimelineStepsContent>
          <TimelineStepsDescription>Estimated delivery tomorrow.</TimelineStepsDescription>
        </TimelineStepsContent>
      </TimelineStepsItem>
    </TimelineSteps>
  )
}
