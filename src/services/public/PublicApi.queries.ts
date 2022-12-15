import { useMutation } from '@tanstack/react-query';
import { IContactMail } from '../../common/interfaces/ContactMail.interface';
import { IFeedback } from '../../common/interfaces/Feedback.interface';
import { sendContactMail, sendServiceFeedback } from './PublicApi.service';

export const useSendContactMailMutation = () => {
  return useMutation((contactMailPayload: IContactMail) => sendContactMail(contactMailPayload));
};

export const useSendServiceFeedback = () => {
  return useMutation(({ id, data }: { id: string; data: IFeedback }) =>
    sendServiceFeedback(id, data),
  );
};
