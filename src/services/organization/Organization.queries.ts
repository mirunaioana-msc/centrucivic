import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { OrganizationQuery } from '../../common/interfaces/OrganizationQuery.interface';
import { getOrganizations, getOrganizationWithCivicServices } from './Organization.service';

export const useOrganizationsInfiniteQuery = (query?: OrganizationQuery) => {
  return useInfiniteQuery(
    ['organizations', query],
    ({ pageParam }) => {
      return getOrganizations({ pageParam, ...query });
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.meta.totalPages > lastPage?.meta.currentPage
          ? lastPage?.meta.currentPage + 1
          : undefined;
      },
      retry: 0,
    },
  );
};

export const useOrganization = (organizationId: string) => {
  return useQuery(
    ['organization', organizationId],
    () => getOrganizationWithCivicServices(organizationId),
    {
      enabled: !!organizationId,
      retry: 0,
    },
  );
};
