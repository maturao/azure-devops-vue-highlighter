export default defineContentScript({
  matches: ["https://*.visualstudio.com/**", "https://dev.azure.com/**"],

  async main() {
    await injectScript("/monaco-vue-highlighter.js", {
      keepInDom: true,
    });
  },
});
