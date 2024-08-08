import { Injectable } from '@nestjs/common';
import { WorkflowClient } from '@temporalio/client';
import { Activities, Activity, InjectTemporalClient } from 'nestjs-temporal';
import { emailCampaignWorkflow } from '../workflows/email-campaign.workflow';

@Activities()
@Injectable()
export class EmailCampaignService {
  constructor(
    @InjectTemporalClient() private readonly temporalClient: WorkflowClient,
  ) {}

  async startCampaign(templateId: string, contactListId: string) {
    const handle = await this.temporalClient.start(emailCampaignWorkflow, {
      args: [templateId, contactListId],
      workflowId: `email-campaign-${Date.now()}`,
      taskQueue: 'ezy-mailer-flow',
    });

    return handle.result();
  }

  @Activity()
  async sendEmail(email: string, templateId: string): Promise<void> {
    // Lógica para enviar o e-mail usando o template
    // await send(email, templateId);
    console.log(`Sending email to ${email} using template ${templateId}`);
    
  }
}
