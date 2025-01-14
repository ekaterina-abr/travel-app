export enum DestinationId {
  Egypt = "Egypt",
  Thailand = "Thailand",
  Turkey = "Turkey",
  UAE = "UAE",
}

export interface IDestination {
  id: DestinationId;
  title: string;
  description?: string;
  isSelected?: boolean;
}
