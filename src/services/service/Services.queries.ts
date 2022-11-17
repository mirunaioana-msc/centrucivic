import { useQuery } from '@tanstack/react-query';
import { PaginatedEntity } from '../../common/interfaces/PaginatedEntity.interface';
import { IService } from '../../common/interfaces/Service.interface';
import { useServices } from '../../store/Selectors';
import useStore from '../../store/Store';
import { getServiceById, searchServices } from './Services.service';

export const useServicesQuery = () => {
  const { setServices } = useStore();
  const {
    filters: { search, locationId, domains, start, end, ageCategories, },
    meta: { currentPage, itemsPerPage },
  } = useServices();

  return useQuery(
    [
      'services',
      itemsPerPage,
      currentPage,
      search,
      locationId,
      domains,
      start,
      end,
      ageCategories,
    ],
    () =>
      searchServices(
        itemsPerPage,
        currentPage,
        search,
        locationId,
        domains,
        start,
        end,
        ageCategories,
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
    enabled: !!id, retry: 0, onSuccess: (data: IService) => {
      setSelectedService(data);
    },
  });
}