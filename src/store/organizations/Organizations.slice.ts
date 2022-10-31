import { OrderDirection } from "../../common/enums/OrderDirection.enum";
import { OrganizationFlat } from "../../common/interfaces/OrganizationFlat.interface";
import { PaginatedEntity } from "../../common/interfaces/PaginatedEntity.interface";


export const organizationsSlice = (set: any) => ({
  organizations: {
    items: [],
    meta: {
      currentPage: 1,
      itemCount: 0,
      itemsPerPage: 10,
      totalItems: 0,
      totalPages: 1,
      orderByColumn: 'id',
      orderDirection: OrderDirection.ASC,
    },
  },
  setOrganizations: (organizations: PaginatedEntity<OrganizationFlat>) => {
    set({ organizations });
  },
});

export default { organizationsSlice };
