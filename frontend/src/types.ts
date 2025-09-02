export enum DestinationId {
  Egypt = "Egypt",
  Thailand = "Thailand",
  Turkey = "Turkey",
  UAE = "UAE",
}

export interface IDestinationResponse {
  id: string;
  title: string;
  description?: string;
  isSelected?: boolean;
  isoCode?: string;
}

export interface IDestination {
  id: string;
  title: string;
  description?: string;
  isSelected?: boolean;
  flag?: React.ReactNode;
}
