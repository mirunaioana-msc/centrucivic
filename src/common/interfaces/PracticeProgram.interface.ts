import { City } from './City.interface';
import { Domain } from './Domain.interface';
import { Faculty } from './Faculty.interface';
import { Skill } from './Skill.interface';

export interface IPracticeProgram {
  id: number;
  title: string;
  deadline: Date | null;
  description: string;
  startDate: Date;
  endDate: Date | null;
  minWorkingHours: number;
  maxWorkingHours: number;
  link: string;
  location: City;
  domains: Domain[];
  faculties: Faculty[];
  skills: Skill[];
  organization: {
    id: number;
    organizationGeneral: {
      name: string;
    };
  };
}
