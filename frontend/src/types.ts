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
