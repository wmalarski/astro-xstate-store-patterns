import react from "@astrojs/react";
import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      include: ["**/react/*"],
    }),
    solid({
      include: ["**/solid/*"],
    }),
    tailwind(),
  ],
  output: "hybrid",
  adapter: cloudflare(),
});
