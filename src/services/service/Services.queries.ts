import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { CivicCenterQuery } from '../../common/interfaces/CivicCenterQuery.interface';
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
  return useQuery(['service', id], () => getServiceById(id), {
    enabled: !!id,
    retry: 0,
  });
};
