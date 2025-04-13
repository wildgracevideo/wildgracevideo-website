import { sendEmail } from '~~/shared/lib/send-email';
import {
    GetStartedSubmitRequest,
    RecaptchaType,
} from '~~/shared/types/form-requests';
import { validateRecaptcha } from '~~/shared/lib/validate-recaptcha';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event): Promise<void> => {
    const body = await readBody<GetStartedSubmitRequest>(event);
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
            RecaptchaType.GetStarted
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
          Business Name: ${body.businessName}
          <br />
          Phone: ${body.phone}
          <br />
          Current Business Challenge: ${body.currentBusinessChallenge}
          <br />
          How did you hear about us? ${body.hearChoice}
          <br />
          Monthly Tip Signup: ${body.monthlyTipSignup === true ? 'Yes' : 'No'}
          <br />
          Business Website:  ${body.businessWebsite || 'N/A'}
        </body>
    </html>`;

    const subject = 'Wild Grace Videography Get Started Form';
    const responseData = await sendEmail(
        htmlBody,
        runtimeConfig.formsToEmail,
        subject,
        runtimeConfig.formsFromEmail
    );
    console.log('email submitted to SES', responseData);
});
