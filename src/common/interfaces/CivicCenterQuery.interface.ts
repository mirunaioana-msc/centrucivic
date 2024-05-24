import { Domain } from 'domain';

export interface CivicCenterQuery {
  search?: string;
  group?: string;
  end?: string;
  start?: string;
  beneficiaries?: Domain[];
  domains?: number[];
  locationId?: number;
}
