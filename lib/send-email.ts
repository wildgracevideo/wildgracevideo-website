import { SESv2Client, SendEmailCommand, type SendEmailRequest, type SendEmailResponse } from '@aws-sdk/client-sesv2';
import { awsConfig } from '~/lib/aws';

const runtimeConfig = useRuntimeConfig();
  
export async function sendEmail(htmlBody: string, toEmail?: string, subject: string, fromEmail?: string): Promise<SendEmailResponse> {
  const sesClient = new SESv2Client(awsConfig);
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
  return await sesClient.send(new SendEmailCommand(params));
}
