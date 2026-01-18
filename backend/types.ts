export const DestinationId = {
  Egypt: "Egypt",
  Thailand: "Thailand",
  Turkey: "Turkey",
  UAE: "UAE",
} as const;

export type DestinationId = (typeof DestinationId)[keyof typeof DestinationId];

export interface INotification {
  id: number;
  text: string;
  date: Date;
  isRead: boolean;
}

export interface INotificationWSSentMsg {
  type: "new-notification";
  msg: INotification;
}

export interface INotificationWSReceivedMsg {
  type: "mark-read";
  id: number;
}

export interface IApolloContext {
  session: string;
  setSession: (session: string, expiresAt: Date) => void;
}
