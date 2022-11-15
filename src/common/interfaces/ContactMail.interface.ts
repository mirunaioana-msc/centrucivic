import { MAIL_APP_TYPE } from '../constants/MailAppType.constants';

export interface IContactMail {
  from: string;
  text: string;
  sender: string;
  type: MAIL_APP_TYPE;
}
