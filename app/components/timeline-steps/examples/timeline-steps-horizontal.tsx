import {
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
}
