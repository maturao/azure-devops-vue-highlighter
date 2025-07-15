import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-vue", "@wxt-dev/auto-icons"],
  manifest: {
    name: "Azure DevOps Vue Highlighter",
    permissions: ["tabs", "storage"],
  },
  autoIcons: {
    baseIconPath: "assets/icon.svg",
    grayscaleOnDevelopment: false,
  },
});
