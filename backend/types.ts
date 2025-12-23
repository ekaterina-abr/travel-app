export const DestinationId = {
  Egypt: "Egypt",
  Thailand: "Thailand",
  Turkey: "Turkey",
  UAE: "UAE",
} as const;

export type DestinationId = (typeof DestinationId)[keyof typeof DestinationId];

export interface IDestination {
  id: DestinationId;
  title: string;
  description?: string;
  isSelected?: boolean;
  isoCode?: string;
}

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
