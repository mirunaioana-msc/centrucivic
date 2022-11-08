/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderDirection } from '../../common/enums/OrderDirection.enum';
import { ISelectData } from '../../common/helpers/Nomenclature.helper';
import { PaginatedEntity } from '../../common/interfaces/PaginatedEntity.interface';
import { IService } from '../../common/interfaces/Service.interface';

export const servicesSlice = (set: any) => ({
  services: {
    items: [],
    meta: {
      currentPage: 1,
      itemCount: 0,
      itemsPerPage: 5,
      totalItems: 0,
      totalPages: 1,
      orderByColumn: 'id',
      orderDirection: OrderDirection.ASC,
    },
    filters: {
      search: '',
      locationId: undefined,
      faculties: [],
      workingHours: undefined,
      domains: [],
      start: undefined,
      end: undefined,
    },
  },
  setServices: (services: PaginatedEntity<IService>) => {
    set((state: { services: PaginatedEntity<IService> }) => ({
      services: {
        ...state.services,
        meta: services.meta,
        items: [...state.services.items, ...services.items],
      },
    }));
  },
  nextPageServices: () => {
    set((state: { services: PaginatedEntity<IService> }) => ({
      services: {
        ...state.services,
        meta: {
          ...state.services.meta,
          currentPage: state.services.meta.currentPage + 1,
        },
      },
    }));
  },
  updateServicesFilters: (
    search?: string,
    organizationId?: ISelectData,
    locationId?: ISelectData,
    domains?: ISelectData[],
    ageCategories?: ISelectData[],
    start?: string,
    end?: string,
  ) => {
    set((state: { services: PaginatedEntity<IService> }) => ({
      services: {
        items: [],
        meta: {
          ...state.services.meta,
          currentPage: 1,
        },
        filters: {
          search,
          locationId,
          organizationId,
          ageCategories,
          domains,
          start,
          end,
        },
      },
    }));
  },
});

export default { servicesSlice };
