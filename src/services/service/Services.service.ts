import { AgeCategories } from '../../common/enums/AgeCategory.enum';
import { ISelectData } from '../../common/helpers/Nomenclature.helper';
import { PaginatedEntity } from '../../common/interfaces/PaginatedEntity.interface';
import { IService } from '../../common/interfaces/Service.interface';
import API from '../API';

export const searchServices = async (
  limit: number,
  page: number,
  search?: string,
  locationId?: ISelectData,
  domains?: ISelectData[],
  start?: string,
  end?: string,
  ageCategories?: ISelectData[],
): Promise<PaginatedEntity<IService>> => {
  return API.get('/api/civic-service/search', {
    params: {
      limit,
      page,
      search: search || undefined,
      locationId: locationId?.value,
      domains: domains?.map((domain) => domain.value),
      start,
      end,
      ageCategories: ageCategories?.map((ageCategory) => ageCategory.value),
    },
  }).then((res) => res.data);
};