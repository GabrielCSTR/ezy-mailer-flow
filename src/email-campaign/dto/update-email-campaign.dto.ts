import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailCampaignDto } from './create-email-campaign.dto';

export class UpdateEmailCampaignDto extends PartialType(CreateEmailCampaignDto) {}
