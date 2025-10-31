# ABUI Registry

This is a public, open-source component registry.

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
npx shadcn@latest add @abui/radio-tabs
npx shadcn@latest add @abui/radio-rows
```
