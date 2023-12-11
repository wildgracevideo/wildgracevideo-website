import { sendGrid } from '~/lib/send-grid';

const runtimeConfig = useRuntimeConfig();

export interface ProductTemplateData {
    firstName: string;
}

export interface DiscoveryCallTemplateData {
    firstName: string;
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

export async function sendTemplatedEmail(
    toEmail: string,
    templateId: string,
    templateData: ProductTemplateData | DiscoveryCallTemplateData
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
