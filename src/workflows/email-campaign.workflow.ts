import { proxyActivities } from '@temporalio/workflow';
import { EmailCampaignService } from '../email-campaign/email-campaign.service';

const { sendEmail } = proxyActivities<EmailCampaignService>({
  startToCloseTimeout: '1 minute',
});

export async function emailCampaignWorkflow(
  templateId: string,
  contactListId: string,
) {
  const contacts = await getContacts(contactListId);
  for (const contact of contacts) {
    await retry(async () => {
      await sendEmail(contact.email, templateId);
    });
  }
}

async function getContacts(contactListId: string): Promise<any[]> {
  // Lógica para buscar contatos do banco de dados
  return [];
}

async function retry<T>(fn: () => Promise<T>): Promise<T> {
  let attempts = 0;
  const maxAttempts = 3;
  while (attempts < maxAttempts) {
    try {
      return await fn();
    } catch (error) {
      attempts++;
      if (attempts >= maxAttempts) {
        throw error;
      }
    }
  }
}
