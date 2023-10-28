export interface MessageReplyRequest {
  toEmail: string;
  subject: string;
  message: string;
  messageId: number;
  name: string;
}