import {
  SESClient,
  SESClientConfig,
  SendEmailCommand,
} from '@aws-sdk/client-ses';

export class EmailService {
  private static sourceEmail = process.env.SOURCE_EMAIL;

  constructor(private readonly clientEmail: SESClient) {}

  static getInstance() {
    const config: SESClientConfig = {};
    const sesClient = new SESClient(config);

    return new EmailService(sesClient);
  }

  send = async (toAddresses: string[], subject: string, body: string) => {
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: toAddresses,
      },
      Message: {
        Subject: { Data: subject },
        Body: {
          Text: { Data: body },
        },
      },
      Source: EmailService.sourceEmail,
    });

    return await this.clientEmail.send(command);
  };
}
