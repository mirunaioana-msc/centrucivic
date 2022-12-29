import { AgeCategory } from '../enums/AgeCategory.enum';
import { City } from './City.interface';
import { Domain } from './Domain.interface';

export interface IService {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  startDate: Date;
  endDate: Date | null;
  location: City;
  domains: Domain[];
  ageCategories: AgeCategory[];

  // Online
  hasOnlineAccess: boolean;
  onlineAccessLink: string;
  onlineAccessDescription: string;

  // Emain & Phone
  hasEmailPhoneAccess: boolean;
  emailAccess: string;
  phoneAccess: string;
  emailPhoneAccessDescription: string;

  // Physical
  hasPhysicalAccess: boolean;
  physicalAccessAddress: string;
  physicalAccessDescription: string;

  active: boolean;
  logo: string;
  organizationName: string;
  organizationId: string;

  feedbacks: any[];
}
