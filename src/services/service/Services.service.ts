import { AgeCategory } from '../../common/enums/AgeCategory.enum';
import { PaginatedEntity } from '../../common/interfaces/PaginatedEntity.interface';
import { IService } from '../../common/interfaces/Service.interface';
import API from '../API';

export const searchServices = async (
  limit: number,
  page: number,
  search?: string | null,
  locationId?: number | null,
  ageCategories?: (AgeCategory | null)[] | null,
  domains?: (number | null)[] | null,
  start?: Date | null,
  end?: Date | null,
): Promise<PaginatedEntity<IService>> => {
  return API.get('/api/civic-service/search', {
    params: {
      limit,
      page,
      search,
      locationId,
      domains,
      start,
      end,
      ageCategories,
    },
  }).then((res) => res.data);
};

export const getServiceById = async (id: string): Promise<IService> => {
  return API.get(`/api/civic-service/${id}`).then((res) => res.data);
};
