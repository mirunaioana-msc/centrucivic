import create from 'zustand';
import { City } from '../common/interfaces/City.interface';
import { Domain } from '../common/interfaces/Domain.interface';
import { Faculty } from '../common/interfaces/Faculty.interface';
import { Organization } from '../common/interfaces/Organization.interface';
import { OrganizationFlat } from '../common/interfaces/OrganizationFlat.interface';
import { PaginatedEntity } from '../common/interfaces/PaginatedEntity.interface';
import { IService } from '../common/interfaces/Service.interface';
import { nomenclatureSlice } from './nomenclatures/Nomenclatures.slice';
import { organizationsSlice } from './organizations/Organizations.slice';
import { servicesSlice } from './services/Services.slice';

interface ServicesState {
  services: PaginatedEntity<IService>;
  selectedService: IService | null;
  setSelectedService: (selectedService: IService) => void;
  setServices: (services: PaginatedEntity<IService>) => void;
  nextServices: (services: PaginatedEntity<IService>) => void;
}

interface OrganizationsState {
  organizations: PaginatedEntity<OrganizationFlat>;
  selectedOrganization: Organization | null;
  setSelectedOrganization: (selectedOrganization: Organization) => void;
  setOrganizations: (organizations: PaginatedEntity<OrganizationFlat>) => void;
  nextOrganizations: (organizations: PaginatedEntity<OrganizationFlat>) => void;
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
