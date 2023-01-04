import create from 'zustand';
import { City } from '../common/interfaces/City.interface';
import { Domain } from '../common/interfaces/Domain.interface';
import { Faculty } from '../common/interfaces/Faculty.interface';
import { nomenclatureSlice } from './nomenclatures/Nomenclatures.slice';
import { breadcrumbsSlice } from './breadcrumbs-state/Breadcrumbs.slice';

interface NomenclatureState {
  cities: City[];
  domains: Domain[];
  faculties: Faculty[];
  setCities: (cities: City[]) => void;
  setDomains: (domains: Domain[]) => void;
  setFaculties: (faculties: Faculty[]) => void;
}

interface BreadcurmbsState {
  organizationName: string | null;
  serviceName: string | null;
  setOrganizationName: (organizationName: string) => void;
  setServiceName: (serviceName: string) => void;
}

const useStore = create<NomenclatureState & BreadcurmbsState>()((set: any) => ({
  ...nomenclatureSlice(set),
  ...breadcrumbsSlice(set),
}));

export default useStore;
