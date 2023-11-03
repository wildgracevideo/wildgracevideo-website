import sgMail from '@sendgrid/mail';

const runtimeConfig = useRuntimeConfig();
sgMail.setApiKey(runtimeConfig.sendGridApiKey);

export const sendGrid = sgMail;