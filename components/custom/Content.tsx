import { cn } from "@/lib/utils"

export default function Content({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("w-full flex flex-col items-start gap-y-6 p-6 2xl:gap-y-10 2xl:p-10", className)}
      {...props}
    />
  )
}
