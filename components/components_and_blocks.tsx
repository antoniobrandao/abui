// components
import { Logo } from "@/registry/abui/branding/logo"
// import { MainNav } from "@/registry/abui/navigation/main-nav"
// import { SiteHeader } from "@/registry/abui/navigation/site-header"
// blocks
import { ExampleHero } from "@/registry/abui/examples/example-hero"

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
    name: "example-hero",
    title: "Example Hero",
    description: "An example hero block with a heading, subheading, and two call to action buttons.",
    registryDependencies: ["@abui/hero"],
    files: [
      {
        path: "registry/abui/examples/example-hero.tsx",
        type: "registry:component",
      },
    ],
    component: ExampleHero,
  },
]
