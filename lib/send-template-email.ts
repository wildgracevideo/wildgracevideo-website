import { sendGrid } from '~/lib/send-grid';

const runtimeConfig = useRuntimeConfig();

export interface ReelIdeasTemplateData {
  firstName: string;
}

export async function sendReelIdeasEmail(toEmail: string, templateData: ReelIdeasTemplateData): Promise<void> {
  return await sendTemplatedEmail(toEmail, runtimeConfig.reelIdeasTemplateId, templateData);
}

async function sendTemplatedEmail(toEmail: string, templateId: string, templateData: ReelIdeasTemplateData) {
 const message = {
    from: {
      email: runtimeConfig.clientFromEmailAddress
    },
    personalizations: [
      {
        to: [
          {
            email: toEmail,
          }
        ],
        dynamic_template_data: templateData,
      }
    ],
    template_id: templateId,
  };

  try {
    const response = await sendGrid.send(message);
    console.log('Sent email.', response);
  } catch (error: any) {
    console.error('Failed to send email with sendGrid.', error);
    if (error.response) {
      console.error(error.response.body)
    }
    throw error;
  }
}