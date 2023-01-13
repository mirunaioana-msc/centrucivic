import { formatISO9075 } from 'date-fns';
import { CivicCenterQuery } from '../../common/interfaces/CivicCenterQuery.interface';
import { PaginatedEntity } from '../../common/interfaces/PaginatedEntity.interface';
import { IService } from '../../common/interfaces/Service.interface';
import API from '../API';

export const getServices = async ({
  pageParam = 1,
  ...query
}: {
  pageParam?: number;
} & Partial<CivicCenterQuery>): Promise<PaginatedEntity<IService>> => {
  return API.get('/api/civic-service/search', {
    params: {
      limit: 25,
      page: pageParam,
      ...query,
      start: query?.start ? formatISO9075(new Date(query?.start)) : undefined,
      end: query?.end ? formatISO9075(new Date(query?.end)) : undefined,
    },
  }).then((res) => res.data);
};

export const getServiceById = async (id: string): Promise<IService> => {
  return API.get(`/api/civic-service/${id}`).then((res) => res.data);
};
