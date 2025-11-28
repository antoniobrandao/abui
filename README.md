# ABUI Registry

A `shadcn/ui`-compatible registry of reusable components, blocks, and utilities conforming to Vercel's [components.build](https://components.build) specification.

## Usage

To install components from the ABUI registry, you can use the following remote registries config in your `components.json` file:

```json
{
  "registries": {
    "@abui": "https://abui.io/r/{name}.json"
  }
}
```

You can then add items using the following command:

```bash
npx shadcn@latest add @abui/spinner
```

## Development

Clone the repository, then install the dependencies and run the development server.

```bash
pnpm install
pnpm dev
```

The development server will be available at `http://localhost:3003`.
