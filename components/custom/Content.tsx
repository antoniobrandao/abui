import { cn } from "@/lib/utils"

export default function Content({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("w-full flex flex-col items-start gap-y-4 p-6", className)} {...props} />
}
