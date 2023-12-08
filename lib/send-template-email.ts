import { sendGrid } from '~/lib/send-grid';

const runtimeConfig = useRuntimeConfig();

export interface ReelIdeasTemplateData {
    firstName: string;
}

export interface DiscoveryCallTemplateData {
    firstName: string;
}

export interface InteriorDesignerReelIdeasTemplateData {
    firstName: string;
}

export async function sendReelIdeasEmail(
    toEmail: string,
    templateData: ReelIdeasTemplateData
): Promise<string> {
    return await sendTemplatedEmail(
        toEmail,
        runtimeConfig.reelIdeasTemplateId,
        templateData
    );
}

export async function sendDiscoveryCall(
    toEmail: string,
    templateData: DiscoveryCallTemplateData
): Promise<string> {
    return await sendTemplatedEmail(
        toEmail,
        runtimeConfig.discoveryCallTemplateId,
        templateData
    );
}

export async function sendInteriorDesignerReelIdeasEmail(
    toEmail: string,
    templateData: InteriorDesignerReelIdeasTemplateData
): Promise<string> {
    return await sendTemplatedEmail(
        toEmail,
        runtimeConfig.interiorDesignerReelIdeasTemplateId,
        templateData
    );
}

async function sendTemplatedEmail(
    toEmail: string,
    templateId: string,
    templateData: ReelIdeasTemplateData
): Promise<string> {
    const message = {
        from: {
            email: runtimeConfig.clientFromEmailAddress,
        },
        personalizations: [
            {
                to: [
                    {
                        email: toEmail,
                    },
                ],
                dynamic_template_data: templateData,
            },
        ],
        templateId,
    };

    try {
        const response = await sendGrid.send(message);
        console.log('Sent email.', response);
        if (response && response.length > 0) {
            return response[0].headers['x-message-id'] || 'Unknown';
        } else {
            return 'Unknown';
        }
    } catch (error: unknown) {
        console.error('Failed to send email with sendGrid.', error);
        // @ts-expect-error TODO Improve error handling
        if (error?.response) {
            // @ts-expect-error TODO Improve error handling
            console.error(error.response.body);
        }
        throw error;
    }
}
