import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
}
