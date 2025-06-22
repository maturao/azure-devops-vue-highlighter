export interface HighlightedFiles {
  [tabId: string]: string[];
}

export const highlightedFilesStorage = storage.defineItem<HighlightedFiles>(
  "session:highlightedFiles"
);
