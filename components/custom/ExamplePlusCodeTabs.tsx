import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "./CodeBlock"

enum TabsEnum {
  DEMO = "Demo",
  CODE = "Code",
}

interface ExamplePlusCodeTabsProps {
  demoJSX: React.ReactNode | null
  code: {
    language: string
    filename: string
    code: string
  }
}

const ExamplePlusCodeTabs = ({ demoJSX, code }: ExamplePlusCodeTabsProps) => {
  return (
    <Tabs defaultValue={demoJSX ? TabsEnum.DEMO : TabsEnum.CODE}>
      <TabsList>
        {demoJSX ? <TabsTrigger value={TabsEnum.DEMO}>{TabsEnum.DEMO}</TabsTrigger> : null}
        <TabsTrigger value={TabsEnum.CODE}>{TabsEnum.CODE}</TabsTrigger>
      </TabsList>
      {demoJSX ? <TabsContent value={TabsEnum.DEMO}>{demoJSX}</TabsContent> : null}
      <TabsContent value={TabsEnum.CODE}>
        <CodeBlock
          className="max-h-[300px] overflow-y-auto"
          code={[
            {
              language: code.language,
              filename: code.filename,
              code: code.code,
            },
          ]}
        />
      </TabsContent>
    </Tabs>
  )
}

export default ExamplePlusCodeTabs
