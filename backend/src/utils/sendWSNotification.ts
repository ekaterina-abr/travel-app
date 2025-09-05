import type { WebSocket } from "ws";
import type { INotification, INotificationWSSentMsg } from "../types.js";

interface ISendWSNotificationArgs {
  text: string;
  notifications: INotification[];
  ws: WebSocket;
}

export const sendWSNotification = ({
  text,
  notifications,
  ws,
}: ISendWSNotificationArgs) => {
  const newNotification: INotification = {
    id: notifications.length + 1,
    text,
    date: new Date(),
    isRead: false,
  };
  const newNotificationMsg: INotificationWSSentMsg = {
    type: "new-notification",
    msg: newNotification,
  };
  notifications.push(newNotification);
  ws.send(JSON.stringify(newNotificationMsg));
};
