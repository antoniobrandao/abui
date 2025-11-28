export const demoCode = `import {
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
}`

export const withIconsCode = `import { Check, Circle, Package, Truck } from "lucide-react"

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
}`

export const activityFeedCode = `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

export default function TimelineActivityFeed() {
  return (
    <TimelineSteps>
      <TimelineStepsItem>
        <TimelineStepsConnector />
        <TimelineStepsHeader>
          <TimelineStepsIcon className="overflow-hidden p-0">
            <Avatar className="size-full">
              <AvatarImage src="/avatars/01.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </TimelineStepsIcon>
          <div className="flex flex-col gap-0.5">
            <TimelineStepsTitle>
              <span className="font-semibold">Sarah Chen</span>{" "}
              <span className="text-muted-foreground font-normal">commented on</span>{" "}
              <span className="font-semibold">Issue #42</span>
            </TimelineStepsTitle>
            <TimelineStepsTime>5 minutes ago</TimelineStepsTime>
          </div>
        </TimelineStepsHeader>
        <TimelineStepsContent>
          <TimelineStepsDescription className="bg-muted/50 rounded-md border p-3">
            I think we should consider using a different approach for the authentication flow. Let me know your
            thoughts.
          </TimelineStepsDescription>
        </TimelineStepsContent>
      </TimelineStepsItem>
      <TimelineStepsItem>
        <TimelineStepsConnector />
        <TimelineStepsHeader>
          <TimelineStepsIcon className="overflow-hidden p-0">
            <Avatar className="size-full">
              <AvatarImage src="/avatars/02.png" alt="@user" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </TimelineStepsIcon>
          <div className="flex flex-col gap-0.5">
            <TimelineStepsTitle>
              <span className="font-semibold">John Doe</span>{" "}
              <span className="text-muted-foreground font-normal">merged pull request</span>{" "}
              <span className="font-semibold">#123</span>
            </TimelineStepsTitle>
            <TimelineStepsTime>2 hours ago</TimelineStepsTime>
          </div>
        </TimelineStepsHeader>
      </TimelineStepsItem>
    </TimelineSteps>
  )
}`

export const horizontalCode = `import {
  TimelineSteps,
  TimelineStepsConnector,
  TimelineStepsContent,
  TimelineStepsDescription,
  TimelineStepsIcon,
  TimelineStepsItem,
  TimelineStepsTitle,
} from "@/registry/abui/ui/timeline-steps"

export default function TimelineHorizontal() {
  return (
    <TimelineSteps orientation="horizontal" className="w-full">
      <TimelineStepsItem orientation="horizontal">
        <TimelineStepsConnector orientation="horizontal" />
        <TimelineStepsIcon size="sm" />
        <TimelineStepsContent className="ms-0 items-center text-center">
          <TimelineStepsTitle>Step 1</TimelineStepsTitle>
          <TimelineStepsDescription>Create account</TimelineStepsDescription>
        </TimelineStepsContent>
      </TimelineStepsItem>
      <TimelineStepsItem orientation="horizontal">
        <TimelineStepsConnector orientation="horizontal" />
        <TimelineStepsIcon size="sm" />
        <TimelineStepsContent className="ms-0 items-center text-center">
          <TimelineStepsTitle>Step 2</TimelineStepsTitle>
          <TimelineStepsDescription>Verify email</TimelineStepsDescription>
        </TimelineStepsContent>
      </TimelineStepsItem>
      <TimelineStepsItem orientation="horizontal">
        <TimelineStepsConnector orientation="horizontal" />
        <TimelineStepsIcon size="sm" />
        <TimelineStepsContent className="ms-0 items-center text-center">
          <TimelineStepsTitle>Step 3</TimelineStepsTitle>
          <TimelineStepsDescription>Complete profile</TimelineStepsDescription>
        </TimelineStepsContent>
      </TimelineStepsItem>
      <TimelineStepsItem orientation="horizontal">
        <TimelineStepsIcon size="sm" />
        <TimelineStepsContent className="ms-0 items-center text-center">
          <TimelineStepsTitle>Step 4</TimelineStepsTitle>
          <TimelineStepsDescription>Get started</TimelineStepsDescription>
        </TimelineStepsContent>
      </TimelineStepsItem>
    </TimelineSteps>
  )
}`

