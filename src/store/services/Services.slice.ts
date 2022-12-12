/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderDirection } from '../../common/enums/OrderDirection.enum';
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
  },
  selectedService: null,
  setSelectedService: (selectedService: IService) => set({ selectedService }),
  setServices: (services: PaginatedEntity<IService>) => {
    set({ services });
  },
  nextServices: (services: PaginatedEntity<IService>) => {
    set((state: { services: PaginatedEntity<IService> }) => ({
      services: {
        ...state.services,
        meta: services.meta,
        items: [...state.services.items, ...services.items],
      },
    }));
  },
});

export default { servicesSlice };
