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
    currentBusinessChallenge: string;
    hearChoice: string;
    monthlyTipSignup: boolean;
    businessWebsite?: string | undefined;
    budget?: string | undefined;
}

export enum RecaptchaType {
    GetStarted = 'get_started',
    Contact = 'contact_submit',
}
