import { County } from './County.interface';

export interface City {
  id: number;
  name: string;
  countyId?: number;
  county?: County;
}
