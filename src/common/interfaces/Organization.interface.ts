import { City } from './City.interface';
import { County } from './County.interface';
import { Domain } from './Domain.interface';
import { IService } from './Service.interface';

export interface Organization {
  id: number;
  logo: string;
  name: string;
  shortDescription: string;
  description?: string;
  contact: {
    email: string;
    phone: string;
  };
  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  tiktok?: string;
  city: City;
  county: County;
  domains: Domain[];
  services?: IService[];
}
