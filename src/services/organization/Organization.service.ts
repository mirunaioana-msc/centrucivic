import { Organization } from '../../common/interfaces/Organization.interface';
import { OrganizationFlat } from '../../common/interfaces/OrganizationFlat.interface';
import { OrganizationQuery } from '../../common/interfaces/OrganizationQuery.interface';
import { PaginatedEntity } from '../../common/interfaces/PaginatedEntity.interface';
import API from '../API';

export const getOrganizations = async ({
  pageParam = 1,
  ...query
}: {
  pageParam?: number;
} & Partial<OrganizationQuery>): Promise<PaginatedEntity<OrganizationFlat>> => {
  return API.get('/api/civic-service/organization', {
    params: {
      limit: 25,
      page: pageParam,
      ...query,
    },
  }).then((res) => res.data);
};

export const getOrganizationWithCivicServices = async (
  organizationId: string,
): Promise<Organization> => {
  return API.get(`/api/civic-service/organization/${organizationId}`).then((res) => res.data);
};
