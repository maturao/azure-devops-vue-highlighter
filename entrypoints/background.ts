export default defineBackground(() => {
  const singleTabMessageLimit = 20;
  console.log("Hello background!", { id: browser.runtime.id });

  browser.runtime.onMessage.addListener(async (message, sender) => {
    console.log("Received message:", message, "from sender:", sender);

    const tabId = sender.tab?.id?.toString();

    if (!tabId) {
      console.warn("No tab ID found in sender:", sender);
      return;
    }

    const highlightedFiles = (await highlightedFilesStorage.getValue()) ?? {};

    if (message.type === "highlighterInitialized") {
      await highlightedFilesStorage.setValue({
        ...highlightedFiles,
        [tabId]: [],
      });
      console.log("Highlighter initialized for tab ID:", tabId);
    } else if (message.type === "fileHighlighted") {
      await highlightedFilesStorage.setValue({
        ...highlightedFiles,
        [tabId]: [message.uri, ...highlightedFiles[tabId]].slice(
          0,
          singleTabMessageLimit
        ),
      });
      console.log("File highlighted:", message.uri, "for tab ID:", tabId);
    } else {
      console.warn("Unknown message type:", message.type);
    }
  });
});
