import { useMutation } from '@tanstack/react-query';
import { IContactMail } from '../../common/interfaces/ContactMail.interface';
import { sendContactMail } from './PublicApi.service';

export const useSendContactMailMutation = () => {
  return useMutation((contactMailPayload: IContactMail) => sendContactMail(contactMailPayload));
};
