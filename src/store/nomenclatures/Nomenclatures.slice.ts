import { City } from "../../common/interfaces/City.interface";
import { Domain } from "../../common/interfaces/Domain.interface";
import { Faculty } from "../../common/interfaces/Faculty.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nomenclatureSlice = (set: any) => ({
  cities: [],
  domains: [],
  faculties: [],
  setCities: (cities: City[]) => {
    set({ cities });
  },
  setDomains: (domains: Domain[]) => {
    set({ domains });
  },
  setFaculties: (faculties: Faculty[]) => {
    set({ faculties });
  },

});

export default { nomenclatureSlice };
