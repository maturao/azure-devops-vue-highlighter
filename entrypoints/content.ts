export default defineContentScript({
  matches: ["https://*.visualstudio.com/**", "https://dev.azure.com/**"],

  async main() {
    await injectScript("/monaco-vue-highlighter.js", {
      keepInDom: true,
    });

    onWindowMessage("highlighterInitialized", () => {
      console.log("Highlighter initialized in content script");
      browser.runtime.sendMessage({
        type: "highlighterInitialized",
      });
    });

    onWindowMessage("fileHighlighted", (message) => {
      console.log("File highlighted in content script:", message.uri);
      browser.runtime.sendMessage({
        type: "fileHighlighted",
        uri: message.uri,
      });
    });
  },
});
