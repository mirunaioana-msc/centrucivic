import { Organization } from '../../common/interfaces/Organization.interface';
import { OrganizationFlat } from '../../common/interfaces/OrganizationFlat.interface';
import { PaginatedEntity } from '../../common/interfaces/PaginatedEntity.interface';
import API from '../API';

export const searchOrganizations = async (
  limit: number,
  page: number,
  search?: string | null,
  locationId?: number | null,
  domains?: (number | null)[] | null,
): Promise<PaginatedEntity<OrganizationFlat>> => {
  return API.get('/api/civic-service/organization', {
    params: {
      limit,
      page,
      search: search || undefined,
      locationId,
      domains,
    },
  }).then((res) => res.data);
};

export const getOrganizationWithCivicServices = async (
  organizationId: string,
): Promise<Organization> => {
  return API.get(`/api/civic-service/organization/${organizationId}`).then((res) => res.data);
};
