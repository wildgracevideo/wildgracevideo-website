import { CheckoutType } from "~/lib/checkout-type";

export interface CheckoutRequest {
  type: CheckoutType;
  cancelUrl: string;
  successUrl: string;
}
