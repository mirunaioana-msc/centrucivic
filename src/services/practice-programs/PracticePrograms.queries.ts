import { useQuery } from "@tanstack/react-query";
import { PaginatedEntity } from "../../common/interfaces/PaginatedEntity.interface";
import { searchPracticePrograms } from "./PracticePrograms.service";

export const usePracticeProgramsQuery = (
  limit: number,
  page: number,
  search?: string,
  locationId?: number,
  faculties?: number[],
  workingHours?: string,
  domains?: number[],
  start?: string,
  end?: string,
) => {
  return useQuery(
    ['practice-programs', limit, page, search, locationId, faculties, workingHours, domains, start, end],
    () => searchPracticePrograms(limit, page, search, locationId, faculties, workingHours, domains, start, end),
    {
      onSuccess: (data: PaginatedEntity<any>) => {
        console.log(data);
      },
      enabled: false,
    },
  );
}