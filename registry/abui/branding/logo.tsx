import { cn } from "@/lib/utils"

export function Logo({ className }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 36 36"
      className={cn("text-foreground h-6", className)}
    >
      <path
        fill="currentColor"
        d="M18 0c9.941 0 18 8.059 18 18s-8.059 18-18 18S0 27.941 0 18 8.059 0 18 0M4 23.281h12.34L18.059 26h3.007l-9.39-16zM14.049 10l9.391 16 7.674-13.281h-12.34L17.056 10zm12.771 5.462-3.38 5.646-3.341-5.646zm-11.803 5.076H8.294l3.38-5.646z"
      ></path>
    </svg>
  )
}
