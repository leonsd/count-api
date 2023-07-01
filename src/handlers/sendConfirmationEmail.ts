import { IConfirmationEmail } from '../interfaces/ConfirmationEmail';
import { ISQSEvent } from '../interfaces/SQSEvent';

export const sendConfirmationEmail = (event: ISQSEvent<IConfirmationEmail>) => {
  event.Records.map((record) => {
    const message = record.body;
    console.info('message', message);
  });
};
