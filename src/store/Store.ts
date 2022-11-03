import create from 'zustand';
import { City } from '../common/interfaces/City.interface';
import { Domain } from '../common/interfaces/Domain.interface';
import { Faculty } from '../common/interfaces/Faculty.interface';
import { ILandingCounter } from '../common/interfaces/LandingCounter.interface';
import { OrganizationFlat } from '../common/interfaces/OrganizationFlat.interface';
import { PaginatedEntity } from '../common/interfaces/PaginatedEntity.interface';
import { IPracticeProgram } from '../common/interfaces/PracticeProgram.interface';
import { nomenclatureSlice } from './nomenclatures/Nomenclatures.slice';
import { organizationsSlice } from './organizations/Organizations.slice';
import { practiceProgramsSlice } from './practice-programs/PracticePrograms.slice';
import { PracticeProgramsActiveSlice } from './practice-programs/PracticeProgramsActive.slice';

interface PracticeProgramsState {
  practicePrograms: PaginatedEntity<IPracticeProgram>;
  setPracticePrograms: (practicePrograms: PaginatedEntity<IPracticeProgram>) => void;
}

interface PracticeProgramsActive {
  landingCounters: ILandingCounter;
  setLandingCounters: (landingCounters: ILandingCounter) => void;
}

interface OrganizationsState {
  organizations: PaginatedEntity<OrganizationFlat>;
  setOrganizations: (organizations: PaginatedEntity<OrganizationFlat>) => void;
}

interface NomenclatureState {
  cities: City[];
  domains: Domain[];
  faculties: Faculty[];
  setCities: (cities: City[]) => void;
  setDomains: (domains: Domain[]) => void;
  setFaculties: (faculties: Faculty[]) => void;
}

const useStore = create<
  PracticeProgramsState & NomenclatureState & OrganizationsState & PracticeProgramsActive
>()((set: any) => ({
  ...practiceProgramsSlice(set),
  ...nomenclatureSlice(set),
  ...organizationsSlice(set),
  ...PracticeProgramsActiveSlice(set),
}));

export default useStore;
