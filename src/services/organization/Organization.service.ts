import { Organization } from "../../common/interfaces/Organization.interface";
import { PaginatedEntity } from "../../common/interfaces/PaginatedEntity.interface";
import API from "../API";

export const searchOrganizations = async (
  limit: number,
  page: number,
  search?: string,
  locationId?: number,
  domains?: number[],
): Promise<PaginatedEntity<any>> => {
  let requestUrl = `organization/practice-program?limit=${limit}&page=${page}`;

  if (search) requestUrl = `${requestUrl}&search=${search}`;

  if (locationId) requestUrl = `${requestUrl}&locationId=${locationId}`;

  if (domains) requestUrl = `${requestUrl}&${domains.map(f => `domains[]=${f}`).join('&')}`;

  return API.get(requestUrl).then((res) => res.data);
};

export const getOrganizationWithCivicServices = async (
  organizationId: string,
): Promise<Organization> => {
  return API.get(`api/civic-service/organization/${organizationId}/`).then((res) => res.data);
};