export interface IDestinationResponse {
  id: string;
  title: string;
  description?: string;
  iso_code: string;
  saved_times: number;
}

export interface IDestinationsResponse {
  destinations: IDestinationResponse[];
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

export interface IVerifySessionResponse {
  verifySession: {
    isAuth: boolean;
    userId?: number;
  };
}

export interface IGetUserInfoResponse {
  getUserInfo: {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: Date;
    saved_destinations: string[];
  };
}

export interface IMutateRegisterResponse {
  register: {
    id: number;
    name: string;
    email: string;
    token: string;
  };
}
export interface IMutateLoginResponse {
  login: {
    id: number;
    name: string;
    email: string;
    token: string;
  };
}

export interface IMutateLogoutResponse {
  logout: {
    isAuth: boolean;
    userId?: number;
  };
}

export interface IMutateSaveDestinationsResponse {
  saveDestinations: {
    userId: number;
    savedDestinations: string[];
  };
}

export interface IMutateUnsaveDestinationResponse {
  unsaveDestination: {
    userId: number;
    unsavedDestination: string;
  };
}
