export interface IChatMessage {
  senderMail: string;
  receiverMail: string;
  message: string;
  timeStamp: string;
}

export class ChatMessage implements IChatMessage {
  senderMail: string;
  receiverMail: string;
  message: string;
  timeStamp: string;
}
