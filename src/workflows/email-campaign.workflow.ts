import { proxyActivities } from '@temporalio/workflow';
import { EmailCampaignService } from '../email-campaign/email-campaign.service';

const { sendEmail } = proxyActivities<EmailCampaignService>({
  startToCloseTimeout: '1 minute',
});

export async function emailCampaignWorkflow(templateName: string) {
  const contacts = await getContacts();
  if (contacts.length === 0) {
    return;
  }

  for (const contact of contacts) {
    await retry(async () => {
      await sendEmail(contact.email, templateName);
    });
  }
}

async function getContacts(): Promise<{ email: string }[]> {
  // Lógica para buscar contatos do banco de dados
  // Exemplo de dados de contatos
  return [
    { email: 'g4brielcarlos@hotmail.com' },
    { email: 'g4brielcarlos@hotmail.com' },
    { email: 'g4brielcarlos@hotmail.com' },
    { email: 'g4brielcarlos@hotmail.com' },
    { email: 'g4brielcarlos@hotmail.com' },
    { email: 'g4brielcarlos@hotmail.com' },
    { email: 'g4brielcarlos@hotmail.com' },
    { email: 'g4brielcarlos@hotmail.com' },
    { email: 'g4brielcarlos@hotmail.com' },
    { email: 'g4brielcarlos@hotmail.com' },
    { email: 'g4brielcarlos@hotmail.com' },
  ];
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
