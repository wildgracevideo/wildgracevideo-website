export enum CheckoutType {
  ReelIdeas = "ReelIdeas",
}

export interface CheckoutRequest {
  type: CheckoutType;
  cancelUrl: string;
  successUrl: string;
}