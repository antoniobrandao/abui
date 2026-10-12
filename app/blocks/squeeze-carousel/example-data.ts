import type { SqueezeCarouselItem } from "@/registry/abui/marketing/squeeze-carousel"

const unsplash = (id: string, width: number, height: number) =>
  `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&auto=format&q=80`

/** Desktop images are 16:9 (1632×918), mobile images are 336:350 (672×700), matching the original. */
const picture = (id: string) => ({
  src: unsplash(id, 1632, 918),
  mobileSrc: unsplash(id, 672, 700),
})

export interface ExampleItem extends SqueezeCarouselItem {
  description: string
  cta: string
  href: string
}

export const exampleItems: ExampleItem[] = [
  {
    id: "annual-letter",
    title: "Businesses on ABUI shipped 1.9 million components in 2025.",
    description:
      "Our annual letter explores the trends defining the component economy, including faster adoption of registries, design tokens everywhere, and agentic UI generation.",
    cta: "Read the letter",
    href: "#annual-letter",
    ...picture("1506905925346-21bda4d32df4"),
  },
  {
    id: "peak-day",
    title: "150K+ teams had their best deploy day ever.",
    description:
      "From Black Friday through Cyber Monday, registries served more than 40 billion component installs while maintaining 99.9999% uptime.",
    cta: "See the numbers",
    href: "#peak-day",
    collapsedOffsetX: -4,
    ...picture("1470071459604-3b5ec3a7fe05"),
  },
  {
    id: "benchmark",
    title: "The vertical SaaS design-system benchmark report.",
    description:
      "Learn what is driving growth for product teams in 2025: going multi-brand, embedding motion, and integrating AI into the core of their workflows.",
    cta: "Get the data",
    href: "#benchmark",
    collapsedOffsetX: 120,
    ...picture("1501785888041-af3ef285b470"),
  },
  {
    id: "conversation",
    title: "Two founders sit down to talk about the future of interfaces.",
    description:
      "Hear them discuss the choices that shaped their products, the future of composable UI, and their advice for people starting out today.",
    cta: "Watch video",
    href: "#conversation",
    collapsedOffsetX: 120,
    ...picture("1441974231531-c6227db76b6e"),
  },
  {
    id: "app-stores",
    title: "New tools to ship interfaces outside app stores.",
    description:
      "New platforms mean new opportunities. Read how web components and registries help you ship the same UI everywhere, with more control over your release cycle.",
    cta: "Learn how",
    href: "#app-stores",
    ...picture("1472214103451-9374bd1c798e"),
  },
  {
    id: "partnership",
    title: "A new partnership to enable better open-source components.",
    description:
      "Learn how the partnership helps you tap into a global catalogue of audited, accessible components directly from your editor.",
    cta: "View announcement",
    href: "#partnership",
    collapsedOffsetX: 80,
    ...picture("1433086966358-54859d0ed716"),
  },
  {
    id: "agentic",
    title: "Make your components discoverable by AI agents.",
    description:
      "Find out how the registry protocol allows any agent to install, compose and document your components without requiring any major technical changes.",
    cta: "Read more",
    href: "#agentic",
    ...picture("1500530855697-b586d89ba3ee"),
  },
  {
    id: "retailers",
    title: "How leading teams unify product experiences and drive growth.",
    description:
      "Get insights into how other brands unified their web and native experiences and optimised their onboarding for a seamless first run.",
    cta: "Get the report",
    href: "#retailers",
    ...picture("1518837695005-2083093ee35b"),
  },
]
