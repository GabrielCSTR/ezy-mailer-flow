import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailCampaignModule } from './email-campaign/email-campaign.module';
import { TemporalModule } from 'nestjs-temporal';
import * as path from 'path';
@Module({
  imports: [
    TemporalModule.forRoot({
        workerOptions: {
          taskQueue: 'ezy-mailer-flow',
          workflowsPath: path.resolve(__dirname + "/workflows"),
          reuseV8Context: true,
        },
      }
    ),

    TemporalModule.registerClient(),

    EmailCampaignModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
