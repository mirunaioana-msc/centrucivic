import { PaginatedEntity } from "../../common/interfaces/PaginatedEntity.interface";
import API from "../API";

export const searchPracticePrograms = async (
  limit: number,
  page: number,
  search?: string,
  locationId?: number,
  faculties?: number[],
  workingHours?: string,
  domains?: number[],
  start?: string,
  end?: string,
): Promise<PaginatedEntity<any>> => {
  let requestUrl = `/practice-program/search?limit=${limit}&page=${page}`;

  if (search) requestUrl = `${requestUrl}&search=${search}`;

  if (locationId) requestUrl = `${requestUrl}&locationId=${locationId}`;

  if (faculties) requestUrl = `${requestUrl}&${faculties.map(f => `faculties[]=${f}`).join('&')}`;

  if (workingHours) requestUrl = `${requestUrl}&workingHours=${workingHours}`;

  if (domains) requestUrl = `${requestUrl}&${domains.map(f => `domains[]=${f}`).join('&')}`;

  if (start) requestUrl = `${requestUrl}&start=${start}`;

  if (end) requestUrl = `${requestUrl}&end=${end}`;

  return API.get(requestUrl).then((res) => res.data);
};