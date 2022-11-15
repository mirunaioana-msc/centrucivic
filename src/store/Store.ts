import create from 'zustand';
import { ISelectData } from '../common/helpers/Nomenclature.helper';
import { City } from '../common/interfaces/City.interface';
import { Domain } from '../common/interfaces/Domain.interface';
import { Faculty } from '../common/interfaces/Faculty.interface';
import { Organization } from '../common/interfaces/Organization.interface';
import { OrganizationFilter } from '../common/interfaces/OrganizationFilter.interface';
import { OrganizationFlat } from '../common/interfaces/OrganizationFlat.interface';
import { PaginatedEntity } from '../common/interfaces/PaginatedEntity.interface';
import { IService } from '../common/interfaces/Service.interface';
import { ServiceFilter } from '../common/interfaces/ServiceFilter.interface';
import { nomenclatureSlice } from './nomenclatures/Nomenclatures.slice';
import { organizationsSlice } from './organizations/Organizations.slice';
import { servicesSlice } from './services/Services.slice';

interface ServicesState {
  services: PaginatedEntity<IService> & { filters: ServiceFilter };
  selectedService: IService | null;
  setSelectedService: (selectedService: IService) => void;
  setServices: (services: PaginatedEntity<IService>) => void;
  nextPageServices: () => void;
  updateServicesFilters: (
    search: string,
    locationId: ISelectData,
    domains: ISelectData[],
    start: string,
    end: string,
    ageCategories: ISelectData[],
  ) => void;
}

interface OrganizationsState {
  organizations: PaginatedEntity<OrganizationFlat> & { filters: OrganizationFilter };
  selectedOrganization: Organization | null;
  setSelectedOrganization: (selectedOrganization: Organization) => void;
  setOrganizations: (organizations: PaginatedEntity<OrganizationFlat>) => void;
  nextPageOrganizations: () => void;
  updateOrganizationFilters: (
    search: string,
    locationId: ISelectData,
    selectedDomains: ISelectData[],
  ) => void;
}

interface NomenclatureState {
  cities: City[];
  domains: Domain[];
  faculties: Faculty[];
  setCities: (cities: City[]) => void;
  setDomains: (domains: Domain[]) => void;
  setFaculties: (faculties: Faculty[]) => void;
}


const useStore = create<ServicesState & NomenclatureState & OrganizationsState>()((set: any) => ({
  ...servicesSlice(set),
  ...nomenclatureSlice(set),
  ...organizationsSlice(set),
}));

export default useStore;
