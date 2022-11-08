import { City } from './City.interface';
import { Domain } from './Domain.interface';
import { Faculty } from './Faculty.interface';
import { Skill } from './Skill.interface';

export interface IService {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  startDate: Date;
  endDate: Date | null;
  location: City;
  domains: Domain[];

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
  organization: {
    id: number;
    organizationGeneral: {
      name: string;
    };
  };

  feedbacks: any[];
}
