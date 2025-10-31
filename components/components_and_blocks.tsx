// components
import { Logo } from "@/registry/abui/branding/logo"
// import { MainNav } from "@/registry/abui/navigation/main-nav"
// import { SiteHeader } from "@/registry/abui/navigation/site-header"
// blocks
// import { ExampleHero } from "@/registry/abui/examples/example-hero"
import ScrollRevealContentA from "@/registry/abui/marketing/scroll-reveal-content-a"
import { RadioTabs } from "@/registry/abui/ui/radio-tabs"
import { BreakpointDisplay } from "@/registry/abui/utils/breakpoint-display"

export const components = [
  {
    title: "Logo",
    description: "A logo component.",
    registryDependencies: ["@abui/logo"],
    files: [
      {
        path: "registry/abui/branding/logo.tsx",
        type: "registry:component",
      },
    ],
    name: "logo",
    component: Logo,
  },
  {
    title: "Breakpoint Display",
    description: "A breakpoint display component.",
    registryDependencies: ["@abui/breakpoint-display"],
    files: [
      {
        path: "registry/abui/utils/breakpoint-display.tsx",
        type: "registry:component",
      },
    ],
    name: "breakpoint-display",
    component: BreakpointDisplay,
  },
  {
    title: "Radio Tabs",
    description: "A radio tabs component with optional descriptions for rich variants.",
    registryDependencies: ["@abui/radio-tabs"],
    files: [
      {
        path: "registry/abui/ui/radio-tabs.tsx",
        type: "registry:component",
      },
    ],
    name: "radio-tabs",
    component: RadioTabs,
  },
  // {
  //   title: "Main Nav",
  //   description: "A main navigation block with a logo and main navigation.",
  //   registryDependencies: ["@abui/logo", "@abui/main-nav"],
  //   files: [
  //     {
  //       path: "registry/abui/navigation/main-nav.tsx",
  //       type: "registry:component",
  //     },
  //   ],
  //   name: "main-nav",
  //   component: MainNav,
  // },
  // {
  //   title: "Site Header",
  //   description: "A site header block with a logo and main navigation.",
  //   registryDependencies: ["@abui/logo", "@abui/main-nav"],
  //   files: [
  //     {
  //       path: "registry/abui/navigation/site-header.tsx",
  //       type: "registry:component",
  //     },
  //   ],
  //   name: "site-header",
  //   component: SiteHeader,
  // },
]

export const blocks = [
  {
    title: "Scroll Reveal Content A",
    description: "A scroll reveal content block with a heading, subheading, and two call to action buttons.",
    // registryDependencies: ["@abui/scroll-reveal-content-a"],
    files: [
      {
        path: "registry/abui/marketing/scroll-reveal-content-a.tsx",
        type: "registry:block",
      },
    ],
    name: "scroll-reveal-content-a",
    component: ScrollRevealContentA,
  },
]

export const utils = [
  {
    title: "Orientation Media Queries",
    description: "A set of device orientation media queries.",
    registryDependencies: ["@abui/orientation-media-queries"],
    files: [
      {
        path: "registry/abui/utils/orientation-media-queries.tsx",
        type: "registry:component",
      },
    ],
    name: "orientation-media-queries",
    // component: OrientationMediaQueries,
  },
  {
    title: "Debug utilities",
    description: "A set of debug utilities.",
    registryDependencies: ["@abui/debug-utils"],
    files: [
      {
        path: "registry/abui/utils/debug-utils.tsx",
        type: "registry:component",
      },
    ],
    name: "debug-utils",
    // component: DebugUtils,
  },
]