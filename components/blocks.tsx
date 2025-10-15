import { LoginForm } from "@/registry/abui/auth/login-form"
import { Logo } from "@/registry/abui/branding/logo"
import { ExampleBookingForm } from "@/registry/abui/examples/example-booking-form"
import { ExampleHero } from "@/registry/abui/examples/example-hero"
import { ExampleListingCard } from "@/registry/abui/examples/example-listing-card"
import { ExampleListingGrid } from "@/registry/abui/examples/example-listing-grid"
import { ExampleSectionWithBookingForm } from "@/registry/abui/examples/example-section-booking"
import { ExampleSectionWithListing } from "@/registry/abui/examples/example-section-listing"
import { ContactForm } from "@/registry/abui/forms/contact-form"
import { MainNav } from "@/registry/abui/navigation/main-nav"
import { SiteHeader } from "@/registry/abui/navigation/site-header"
export const blocks = [
  {
    name: "logo",
    component: Logo,
  },
  {
    name: "main-nav",
    component: MainNav,
  },
  {
    name: "site-header",
    component: SiteHeader,
  },
  {
    name: "login-form",
    component: LoginForm,
  },
  {
    name: "booking-form",
    component: ExampleBookingForm,
  },
  {
    name: "contact-form",
    component: ContactForm,
  },
  {
    name: "example-listing-card",
    component: ExampleListingCard,
  },
  {
    name: "example-listing-grid",
    component: ExampleListingGrid,
  },
  {
    name: "example-section-listing",
    component: ExampleSectionWithListing,
  },
  {
    name: "example-section-booking",
    component: ExampleSectionWithBookingForm,
  },
  {
    name: "example-hero",
    component: ExampleHero,
  },
]
