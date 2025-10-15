// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { remarkInstall } from "fumadocs-docgen";
var { docs, meta } = defineDocs({
  dir: "content/docs"
});
var source_config_default = defineConfig({
  generateManifest: true,
  lastModifiedTime: "git",
  mdxOptions: {
    remarkPlugins: [remarkInstall]
  }
});
export {
  source_config_default as default,
  docs,
  meta
};
