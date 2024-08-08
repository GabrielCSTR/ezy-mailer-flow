import { Module } from '@nestjs/common';
import { EmailCampaignService } from './email-campaign.service';
import { EmailCampaignController } from './email-campaign.controller';

@Module({
  controllers: [EmailCampaignController],
  providers: [EmailCampaignService],
})
export class EmailCampaignModule {}
