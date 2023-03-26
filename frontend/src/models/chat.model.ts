export interface ChatInfo {
  _id?: string;
  message: string;
  responseText: string;
  messageId?: string;
  userId: string;
}

interface Message {
  message: string;
  messageId: string;
  responseText: string;
}

export interface UserChats {
  _id?: string;
  userId: string;
  messages: Message[];
}
