import { Controller, Post, Body } from '@nestjs/common';
import { EmailCampaignService } from './email-campaign.service';
import { StartCampaignDto } from './dto/start-campaign.dto';

@Controller('email-campaign')
export class EmailCampaignController {
  constructor(private readonly emailCampaignService: EmailCampaignService) {}

  @Post('start')
  async startCampaign(@Body() startCampaignDto: StartCampaignDto) {
    return await this.emailCampaignService.startCampaign(
      startCampaignDto.templateName,
    );
  }
}
