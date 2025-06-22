<script lang="ts" setup>
const highlightedFiles = ref<string[]>();

async function fetchHighlightedFiles() {
  const activeTab = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  const activeTabId = activeTab[0]?.id?.toString();

  if (!activeTabId) {
    console.warn("No active tab found");
    return;
  }

  const highlightedFilesStr = await highlightedFilesStorage.getValue();

  highlightedFiles.value = highlightedFilesStr?.[activeTabId];
}
fetchHighlightedFiles();
</script>

<template>
  <h2>Azure Devops Vue Highlighter</h2>
  <template v-if="!highlightedFiles">
    <p>Highlighter not initialized...</p>
  </template>
  <template v-else-if="highlightedFiles.length === 0">
    <p>No highlighted files</p>
  </template>
  <template v-else>
    <p>Highlighted files:</p>
    <ul>
      <li
        v-for="(filename, index) in highlightedFiles.slice(0, 10)"
        :key="index"
      >
        <code>{{ filename }}</code>
      </li>
    </ul>
  </template>
</template>
