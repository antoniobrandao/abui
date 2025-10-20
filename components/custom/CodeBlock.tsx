"use client"
import type { BundledLanguage } from "@/components/ui/shadcn-io/code-block"
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
  CodeBlockSelect,
  CodeBlockSelectContent,
  CodeBlockSelectItem,
  CodeBlockSelectTrigger,
  CodeBlockSelectValue,
} from "@/components/ui/shadcn-io/code-block"
const exampleCode = [
  {
    language: "jsx",
    filename: "MyComponent.jsx",
    code: `function MyComponent(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>This is an example React component.</p>
    </div>
  );
}`,
  },
  {
    language: "tsx",
    filename: "MyComponent.tsx",
    code: `function MyComponent(props: { name: string }) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>This is an example React component.</p>
    </div>
  );
}`,
  },
]

interface CodeBlockComponentProps {
  code: {
    language: string
    filename: string
    code: string
  }[]
}
const CodeBlockComponent = ({ code }: CodeBlockComponentProps) => (
  <CodeBlock data={code as any} defaultValue={code[0].language}>
    <CodeBlockHeader>
      <CodeBlockFiles>
        {item => (
          <CodeBlockFilename key={item.language} value={item.language}>
            {item.filename}
          </CodeBlockFilename>
        )}
      </CodeBlockFiles>
      <CodeBlockSelect>
        <CodeBlockSelectTrigger>
          <CodeBlockSelectValue />
        </CodeBlockSelectTrigger>
        <CodeBlockSelectContent>
          {item => (
            <CodeBlockSelectItem key={item.language} value={item.language}>
              {item.language}
            </CodeBlockSelectItem>
          )}
        </CodeBlockSelectContent>
      </CodeBlockSelect>
      <CodeBlockCopyButton
        onCopy={() => console.log("Copied code to clipboard")}
        onError={() => console.error("Failed to copy code to clipboard")}
      />
    </CodeBlockHeader>
    <CodeBlockBody>
      {item => (
        <CodeBlockItem key={item.language} value={item.language}>
          <CodeBlockContent language={item.language as BundledLanguage}>{item.code}</CodeBlockContent>
        </CodeBlockItem>
      )}
    </CodeBlockBody>
  </CodeBlock>
)
export default CodeBlockComponent
