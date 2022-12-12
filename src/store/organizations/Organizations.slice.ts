import { OrderDirection } from '../../common/enums/OrderDirection.enum';
import { Organization } from '../../common/interfaces/Organization.interface';
import { OrganizationFlat } from '../../common/interfaces/OrganizationFlat.interface';
import { PaginatedEntity } from '../../common/interfaces/PaginatedEntity.interface';

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
  selectedOrganization: null,
  setSelectedOrganization: (selectedOrganization: Organization) => set({ selectedOrganization }),
  setOrganizations: (organizations: PaginatedEntity<OrganizationFlat>) => {
    set({ organizations });
  },
  nextOrganizations: (organizations: PaginatedEntity<OrganizationFlat>) => {
    set((state: { organizations: PaginatedEntity<OrganizationFlat> }) => ({
      organizations: {
        ...state.organizations,
        meta: organizations.meta,
        items: [...state.organizations.items, ...organizations.items],
      },
    }));
  },
});

export default { organizationsSlice };
