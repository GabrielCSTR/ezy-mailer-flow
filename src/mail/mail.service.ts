import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: string, templateName: string): Promise<void> {
    await this.mailerService.sendMail({
      from: `'"Fred Foo 👻" <${email}>'`,
      to: email,
      subject: 'Welcome to My App Ezy Mailer! Confirm your Email ✔',
      template: `./${templateName.toLocaleLowerCase()}`,
      context: {
        name: 'User',
        url: 'example.com/auth/confirm?token=some-random-token',
      },
    });
  }
}
