import { Star, KeyRound, ChartColumn, Home } from "lucide-react"
import { NavItems } from "@/components/nav-types"

const navItems: NavItems = {
  main: [
    {
      name: "Overview",
      url: "/",
      icon: Home,
    },
  ],
  components: [
    {
      name: "Logo",
      url: "/components/logo",
      // icon: Star,
    },
    // {
    //   name: "Calendar",
    //   url: "/components/calendar",
    //   // icon: Star,
    // },
    // {
    //   name: "Card",
    //   url: "/components/card",
    //   // icon: Star,
    // },
    // {
    //   name: "Dialog",
    //   url: "/components/dialog",
    //   // icon: Star,
    // },
    // {
    //   name: "Input",
    //   url: "/components/input",
    //   // icon: Star,
    // },
    // {
    //   name: "Label",
    //   url: "/components/input",
    //   // icon: Star,
    // },
  ],
  blocks: [
    {
      name: "Hero",
      url: "/blocks/hero",
      // icon: Home,
    },
    // {
    //   name: "Section",
    //   url: "/blocks/section",
    //   // icon: Star,
    // },
  ],
}

export default navItems
