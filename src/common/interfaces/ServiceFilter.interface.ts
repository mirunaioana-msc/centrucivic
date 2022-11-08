import { ISelectData } from "../helpers/Nomenclature.helper";

export interface ServiceFilter {
  search?: string;
  organizationId?: ISelectData;
  locationId?: ISelectData;
  domains?: ISelectData[];
  ageCategories?: ISelectData[];
  start?: string;
  end?: string;
}
