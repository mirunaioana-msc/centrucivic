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
    },
  }).then((res) => res.data);
};

export const getServiceById = async (id: string): Promise<IService> => {
  return API.get(`/api/civic-service/${id}`).then((res) => res.data);
};
