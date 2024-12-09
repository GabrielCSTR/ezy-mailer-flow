import { IsNotEmpty, IsString } from 'class-validator';
export class StartCampaignDto {
  @IsNotEmpty()
  @IsString()
  templateName: string;
}
