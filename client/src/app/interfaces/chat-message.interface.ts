export interface IChatMessage {
  senderMail: string;
  receiverMail: string;
  message: string;
  timeStamp?: Date;
}

export class ChatMessage implements IChatMessage {
  senderMail: string;
  receiverMail: string;
  message: string;
  timeStamp?: Date;
}
