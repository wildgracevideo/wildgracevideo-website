export interface ContactSubmitRequest {
  token: string;
  firstname: string;
  lastname: string;
  message: string;
  email: string;
}

export interface GetStartedSubmitRequest {
  token: string;
  firstname: string;
  lastname: string;
  email: string;
  businessName: string;
  phone: string;
  goals: string;
  interests: string[];
  businessType: string;
  hearChoice: string;
  monthlyTipSignup: boolean;
  instagramHandle?: string;
};

export enum RecaptchaType {
  GetStarted = "get_started",
  Contact = "contact_submit",
}
