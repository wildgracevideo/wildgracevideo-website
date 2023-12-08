import { type Prisma } from '@prisma/client';
import prisma from '~/lib/prisma';
import { sendEmail } from '~/lib/send-email';
import { ContactSubmitRequest, RecaptchaType } from '~/types/form-requests';
import { validateRecaptcha } from '~/lib/validate-recaptcha';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event): Promise<void> => {
    const body = await readBody<ContactSubmitRequest>(event);
    if (!body.token) {
        console.error('Token body not found.');
        throw createError({ statusMessage: 'Forbidden', statusCode: 403 });
    } else if (!runtimeConfig.recaptchaSecret) {
        console.error('Recaptcha secret key not found.');
        throw createError({ statusMessage: 'Forbidden', statusCode: 403 });
    } else if (
        !(await validateRecaptcha(
            runtimeConfig.recaptchaSecret,
            body.token,
            RecaptchaType.Contact
        ))
    ) {
        throw createError({ statusMessage: 'Forbidden', statusCode: 403 });
    }
    const htmlBody = `<html>
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

    const subject = 'Wild Grace Videography Contact Form';
    const message: Prisma.MessageCreateInput = {
        email: body.email,
        firstname: body.firstname,
        lastname: body.lastname,
        message: body.message,
    };
    const prismaResult = prisma.message.create({ data: message });
    const emailResult = sendEmail(
        htmlBody,
        runtimeConfig.formsToEmail,
        subject,
        runtimeConfig.formsFromEmail
    );
    await prismaResult;
    const responseData = await emailResult;
    console.log('email submitted to SES', responseData);
});
