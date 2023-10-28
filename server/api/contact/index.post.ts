import prisma from "~/lib/prisma";
import { type Prisma } from "@prisma/client";
import { sendEmail } from "~/lib/send-email";
import { ContactSubmitRequest } from "~/types/netlify-request";
import { validateRecaptcha } from "~/functions-shared/validate-recaptcha";

const TO_EMAIL = 'carly@wildgracevideography.com';
const FROM_EMAIL = 'info@wildgracevideography.com';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event): Promise<void> => {
  const body = await readBody<ContactSubmitRequest>(event);
  if (!body.token) {
    console.error('Token body not found.');
    throw createError({ statusMessage: 'Forbidden', statusCode: 403 });
  } else if (!runtimeConfig.recaptchaSecret) {
    console.error('Recaptcha secret key not found.');
    throw createError({ statusMessage: 'Forbidden', statusCode: 403 });
  } else if (!(await validateRecaptcha(runtimeConfig.recaptchaSecret, body.token, 'contact_submit'))) {
    throw createError({ statusMessage: 'Forbidden', statusCode: 403 });
  }
  const htmlBody =
    `<html>
      <body>
        First Name: ${body.firstname}
        <br />
        Last Name: ${body.lastname}
        <br />
        Email: ${body.email}
        <br />
        Message: ${body.message}
      </body>
    </html>`;


  const subject = "Wild Grace Videography Contact Form";
  const message: Prisma.MessageCreateInput = {
    email: body.email,
    firstname: body.firstname,
    lastname: body.lastname,
    message: body.message,
  };
  const prismaResult = prisma.message.create({data: message});
  const emailResult = sendEmail(htmlBody, TO_EMAIL, subject, FROM_EMAIL);
  await prismaResult;
  const responseData = await emailResult;
  console.log("email submitted to SES", responseData);
});
