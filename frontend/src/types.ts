export interface IDestinationResponse {
  id: string;
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

export interface INotificationWSReceivedMsg {
  type: "new-notification";
  msg: INotification;
}

export interface INotificationWSSentMsg {
  type: "mark-read";
  id: number;
}
