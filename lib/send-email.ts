import { SESv2Client, SendEmailCommand, type SendEmailRequest, type SendEmailResponse } from '@aws-sdk/client-sesv2';
import { awsConfig } from '~/lib/aws';
import { sendGrid } from '~/lib/send-grid';

const runtimeConfig = useRuntimeConfig();
  
export async function sendEmail(htmlBody: string, toEmail: string, subject: string, fromEmail?: string): Promise<SendEmailResponse> {
  const sesClient = new SESv2Client(awsConfig);
  console.log(fromEmail);
  const params: SendEmailRequest = {
    Destination: {
      ToAddresses: [toEmail]
    },
    Content: {
      Simple: {
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: htmlBody
          }
        }
      }
    },
    FromEmailAddress: fromEmail || runtimeConfig.clientFromEmailAddress,
  };
  return sesClient.send(new SendEmailCommand(params));
}
