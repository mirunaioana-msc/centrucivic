import { AxiosResponse } from 'axios';
import { IContactMail } from '../../common/interfaces/ContactMail.interface';
import API from '../API';

export const sendContactMail = (contactMailPayload: IContactMail): Promise<void> => {
  return API.post(`api/contact/feedback`, contactMailPayload).then(
    (res: AxiosResponse<void>) => res.data,
  );
};
