import { Injectable } from '@nestjs/common';
import { WorkflowClient } from '@temporalio/client';
import { Activities, Activity, InjectTemporalClient } from 'nestjs-temporal';
import { emailCampaignWorkflow } from '../workflows/email-campaign.workflow';
import { MailService } from 'src/mail/mail.service';

@Activities()
@Injectable()
export class EmailCampaignService {
  constructor(
    @InjectTemporalClient() private readonly temporalClient: WorkflowClient,
    private readonly mailerService: MailService,
  ) {}

  async startCampaign(templateName: string) {
    const handle = await this.temporalClient.start(emailCampaignWorkflow, {
      args: [templateName],
      workflowId: `email-campaign-${templateName}-${Date.now()}`,
      taskQueue: 'ezy-mailer-flow',
    });

    return handle.result();
  }

  @Activity()
  async sendEmail(
    email: string,
    templateName: string,
  ): Promise<{ email: string; templateName: string; success: boolean }> {
    await this.mailerService.sendEmail(email, templateName);
    return { email: email, templateName: templateName, success: true };
  }
}
