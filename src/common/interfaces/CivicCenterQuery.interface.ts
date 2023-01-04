import { AgeCategory } from '../enums/AgeCategory.enum';

export interface CivicCenterQuery {
  search?: string;
  end?: string;
  start?: string;
  ageCategories?: AgeCategory[];
  domains?: number[];
  locationId?: number;
}
