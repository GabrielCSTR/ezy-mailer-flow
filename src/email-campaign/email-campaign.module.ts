import { Module } from '@nestjs/common';
import { EmailCampaignService } from './email-campaign.service';
import { EmailCampaignController } from './email-campaign.controller';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [MailModule],
  controllers: [EmailCampaignController],
  providers: [EmailCampaignService],
})
export class EmailCampaignModule {}
