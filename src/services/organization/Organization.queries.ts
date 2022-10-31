import { useQuery } from "@tanstack/react-query";
import { PaginatedEntity } from "../../common/interfaces/PaginatedEntity.interface";
import { searchOrganizations } from "./Organization.service";

export const useOrganizationQuery = (
  limit: number,
  page: number,
  search?: string,
  locationId?: number,
  domains?: number[],
) => {
  return useQuery(
    ['organizations', limit, page, search, locationId, domains],
    () => searchOrganizations(limit, page, search, locationId, domains),
    {
      onSuccess: (data: PaginatedEntity<any>) => {
        console.log(data);
      },
      enabled: !!(page && limit),
    },
  );
}