import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-vue", "@wxt-dev/auto-icons"],
  manifest: {
    name: "Azure DevOps Vue Highlighter",
    permissions: ["tabs", "storage"],
    web_accessible_resources: [
      {
        matches: ["https://dev.azure.com/*", "https://*.visualstudio.com/*"],
        resources: ["/monaco-vue-highlighter.js"],
      },
    ],
  },
  autoIcons: {
    baseIconPath: "assets/icon.svg",
    developmentIndicator: "overlay",
  },
});
