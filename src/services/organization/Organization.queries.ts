import { useQuery } from '@tanstack/react-query';
import { OrganizationFlat } from '../../common/interfaces/OrganizationFlat.interface';
import { PaginatedEntity } from '../../common/interfaces/PaginatedEntity.interface';
import { useOrganizations } from '../../store/Selectors';
import useStore from '../../store/Store';
import { getOrganizationWithPracticePrograms, searchOrganizations } from './Organization.service';

export const useOrganizationQuery = () => {
  const { setOrganizations } = useStore();
  const {
    filters: { search, locationId, domains },
    meta: { currentPage, itemsPerPage },
  } = useOrganizations();

  return useQuery(
    ['organizations', itemsPerPage, currentPage, search, locationId, domains],
    () => searchOrganizations(itemsPerPage, currentPage, search, locationId, domains),
    {
      onSuccess: (data: PaginatedEntity<OrganizationFlat>) => {
        setOrganizations(data);
      },
      enabled: !!(currentPage && itemsPerPage),
      retry: 0,
    },
  );
};

export const useOrganization = (organizationId: string) => {
  return useQuery(
    ['organization', organizationId],
    () => getOrganizationWithPracticePrograms(organizationId),
    {
      enabled: !!organizationId,
      retry: 0,
    },
  );
};
