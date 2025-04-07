export interface Message {
  id: number;
  username: string;
  content: string;
  timestamp: string | Date;
}

export interface JoinResponse {
  success: boolean;
  username?: string;
  message?: string;
  messages?: Message[];
}

export interface UserEvent {
  username: string;
  timestamp: string | Date;
}
