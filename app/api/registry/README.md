# Registry Routes

This is a public, open-source component registry using Next.js route handlers. No authentication required.

## Route

- `default/[name]/route.ts`: Public registry endpoint for all components

## Usage

To use this registry, add the following to your `components.json` file:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "registries": {
    "@abui": "https://abui-registry.vercel.app/api/registry/default/{name}"
  }
}
```

Then install components with:

```bash
npx shadcn@latest add @abui/login-form
npx shadcn@latest add @abui/hero
npx shadcn@latest add @abui/logo
```

## How it works

The route handler:

1. Uses `generateStaticParams` to pre-render all registry items at build time
2. Fetches the requested component from `registry.json`
3. Returns the component files and metadata as JSON
4. Returns 404 if the component is not found
