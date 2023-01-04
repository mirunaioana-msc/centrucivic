import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { CivicCenterQuery } from '../../common/interfaces/CivicCenterQuery.interface';
import { IService } from '../../common/interfaces/Service.interface';
import useStore from '../../store/Store';
import { getServiceById, getServices } from './Services.service';

export const userCivicCenterServicesInfiniteQuery = (query?: CivicCenterQuery) => {
  return useInfiniteQuery(
    ['services', query],
    ({ pageParam }) => {
      return getServices({ pageParam, ...query });
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.meta.totalPages > lastPage?.meta.currentPage
          ? lastPage?.meta.currentPage + 1
          : undefined;
      },
    },
  );
};

export const useService = (id: string) => {
  const { setServiceName, setOrganizationName } = useStore();
  return useQuery(['service', id], () => getServiceById(id), {
    onSuccess: (service: IService) => {
      setServiceName(service?.name);
      setOrganizationName(service?.organizationName);
    },
    enabled: !!id,
    retry: 0,
  });
};
