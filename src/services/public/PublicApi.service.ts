import { AxiosResponse } from 'axios';
import { IContactMail } from '../../common/interfaces/ContactMail.interface';
import { IFeedback } from '../../common/interfaces/Feedback.interface';
import API from '../API';

export const sendContactMail = (contactMailPayload: IContactMail): Promise<void> => {
  return API.post(`api/contact`, contactMailPayload).then((res: AxiosResponse<void>) => res.data);
};

export const sendServiceFeedback = async (id: string, payload: IFeedback): Promise<void> => {
  return API.post(`/api/civic-service/service/${id}/feedback`, payload).then((res) => res.data);
};
