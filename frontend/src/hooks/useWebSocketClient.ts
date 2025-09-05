import useWebSocket from "react-use-websocket";

interface IWebSocketClientProps {
  url: string;
  shouldConnect?: boolean;
  shouldReconnect?: boolean;
}

export const useWebSocketClient = <T = unknown>({
  url,
  shouldConnect = true,
  shouldReconnect = true,
}: IWebSocketClientProps) => {
  return useWebSocket<T>(
    url,
    {
      shouldReconnect: () => shouldReconnect,
      onOpen: () => console.log("WS connection opened"),
      onClose: () => console.log("WS connection closed"),
    },
    shouldConnect
  );
};
