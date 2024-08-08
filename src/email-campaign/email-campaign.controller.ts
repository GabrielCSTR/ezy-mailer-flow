import { Controller, Post, Body } from '@nestjs/common';
import { EmailCampaignService } from './email-campaign.service';

@Controller('email-campaign')
export class EmailCampaignController {
  constructor(private readonly emailCampaignService: EmailCampaignService) {}

  @Post('start')
  async startCampaign(
    @Body() startCampaignDto: { templateId: string; contactListId: string },
  ) {
    return this.emailCampaignService.startCampaign(
      startCampaignDto.templateId,
      startCampaignDto.contactListId,
    );
  }
}
