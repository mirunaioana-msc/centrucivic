import { ISelectData } from '../helpers/Nomenclature.helper';

export interface OrganizationFilter {
  search?: string;
  locationId?: ISelectData;
  domains?: ISelectData[];
}
