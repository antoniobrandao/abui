import { Separator } from "@/components/ui/separator"
import PageWithBreadcrumbs from "@/components/PageWithBreadcrumbs"
import Link from "next/link"
import { CardTitle } from "@/components/ui/card"
import Content from "@/components/custom/Content"
import { getItemsFromRegistry } from "@/lib/utils/nav-from-registry"

const { components, utils, blocks } = getItemsFromRegistry()

export default function Home() {
  return (
    <PageWithBreadcrumbs>
      <Content className="flex flex-col gap-10">
        <p className="text-muted-foreground max-w-[500px] mt-6">
          A shadcn-compatible registry of reusable components, blocks, and utilities conforming to Vercel&apos;s{" "}
          <Link href="https://www.components.build" className="text-primary hover:underline">
            components.build
          </Link>{" "}
          specification.
        </p>
        <div className="w-full">
          <CardTitle>Components</CardTitle>
          <Separator className="my-4" />
          <div className="grid grid-cols-3 gap-8 w-full">
            {components.map(component => {
              return (
                <div key={component.name} className="flex flex-col gap-1">
                  <Link href={component.url} className="text-sm text-foreground hover:underline">
                    {component.name}
                  </Link>
                  <span className="text-sm text-muted-foreground">{component.description}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-full">
          <CardTitle>Blocks</CardTitle>
          <Separator className="my-4" />
          <div className="grid grid-cols-3 gap-8 w-full">
            {blocks.map(block => {
              return (
                <div key={block.name} className="flex flex-col gap-1">
                  <Link href={block.url} className="text-sm text-foreground hover:underline">
                    {block.name}
                  </Link>
                  <span className="text-sm text-muted-foreground">{block.description}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-full">
          <CardTitle>Utils</CardTitle>
          <Separator className="my-4" />
          <div className="grid grid-cols-3 gap-8 w-full">
            {utils.map(util => {
              return (
                <div key={util.name} className="flex flex-col gap-1">
                  <Link href={util.url} className="text-sm text-foreground hover:underline">
                    {util.name}
                  </Link>
                  <span className="text-sm text-muted-foreground">{util.description}</span>
                </div>
              )
            })}
          </div>
        </div>
      </Content>
    </PageWithBreadcrumbs>
  )
}
