import { omnisend } from '~/lib/omnisend';

export interface CreateContactRequest {
  firstName: string;
  lastName?: string;
  source: Source;
  email: string;
  countryCode?: string;
}

export enum Source {
  THIRTY_DAY_VIDEO_TRANSFORMATION_BUY = '30-day-video-transformation-buy'
}

export async function createContact(request: CreateContactRequest): Promise<void> {
  const now = new Date().toISOString();
  try {
    await omnisend.pOSTContacts({
      createdAt: now,
      firstName: request.firstName,
      lastName: request.lastName,
      tags: [`source:${request.source.valueOf()}`, 'channel:wgv-website'],
      identifiers: [
        {
          type: 'email',
          id: request.email,
          channels: {
            email: {
              status: 'subscribed', 
              statusDate: now
            }
          }
        }
      ],
      countryCode: request.countryCode,
    });
  } catch (e) {
    console.error('Failed to create omnisend contact.', e);
    throw e;
  }
}