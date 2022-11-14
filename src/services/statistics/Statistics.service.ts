import { AxiosResponse } from 'axios';
import { ILandingCounter } from '../../common/interfaces/LandingCounter.interface';
import API from '../API';

export const getLandingCounters = async (pullingType: string): Promise<ILandingCounter> => {
  return API.get(`/statistics/landing-counters?pulling_type=${pullingType}`).then(
    (res: AxiosResponse<ILandingCounter>) => res.data,
  );
};
