import { useQuery } from '@tanstack/react-query';
import { AgeCategory } from '../../common/enums/AgeCategory.enum';
import { PaginatedEntity } from '../../common/interfaces/PaginatedEntity.interface';
import { IService } from '../../common/interfaces/Service.interface';
import { useServices } from '../../store/Selectors';
import useStore from '../../store/Store';
import { getServiceById, searchServices } from './Services.service';

export const useServicesQuery = (
  currentPage: number,
  search?: string | null,
  locationId?: number | null,
  ageCategories?: (AgeCategory | null)[] | null,
  domains?: (number | null)[] | null,
  start?: Date | null,
  end?: Date | null,
) => {
  const { setServices } = useStore();
  const {
    meta: { itemsPerPage },
  } = useServices();

  return useQuery(
    ['services', itemsPerPage, currentPage, search, locationId, domains, start, end, ageCategories],
    () =>
      searchServices(
        itemsPerPage,
        currentPage,
        search,
        locationId,
        ageCategories,
        domains,
        start,
        end,
      ),
    {
      onSuccess: (data: PaginatedEntity<IService>) => {
        setServices(data);
      },
      enabled: !!(currentPage && itemsPerPage),
      retry: 0,
    },
  );
};

export const useService = (id: string) => {
  const { setSelectedService } = useStore();
  return useQuery(['service', id], () => getServiceById(id), {
    enabled: !!id,
    retry: 0,
    onSuccess: (data: IService) => {
      setSelectedService(data);
    },
  });
};
