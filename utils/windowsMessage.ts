interface WindowMessageMap {
  fileHighlighted: FileHighlightedMessage;
  highlighterInitialized: HighlighterInitializedMessage;
}

export type WindowMessageType = keyof WindowMessageMap;

const messageTypeMarker = "__azure_vue_highlighter_message_type";

type WindowMessageInternal<K extends WindowMessageType> =
  WindowMessageMap[K] & {
    [messageTypeMarker]: K;
  };

const postWindowMessageInternal = (
  message: WindowMessageInternal<WindowMessageType>
) => window.postMessage(message);

export const postWindowMessage = <K extends WindowMessageType>(
  type: K,
  message: WindowMessageMap[K]
) =>
  postWindowMessageInternal({
    ...message,
    [messageTypeMarker]: type,
  });

const isWindowMessage = <K extends WindowMessageType>(
  data: unknown,
  type: K
): data is WindowMessageInternal<K> =>
  data !== null &&
  typeof data === "object" &&
  messageTypeMarker in data &&
  data[messageTypeMarker] === type;

export const onWindowMessage = <K extends keyof WindowMessageMap>(
  type: K,
  listener: (message: WindowMessageMap[K]) => void
) =>
  window.addEventListener("message", (event: MessageEvent<unknown>) => {
    if (isWindowMessage(event.data, type)) listener(event.data);
  });
