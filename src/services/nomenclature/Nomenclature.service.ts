import API from '../API';

export const getCities = (searchTerm: string): Promise<any> => {
  let queryParams = '';
  if (searchTerm) {
    queryParams = queryParams.concat(`search=${searchTerm}&`);
  }

  return API.get(`/nomenclatures/cities?${queryParams}`).then((res) => res.data);
};

export const getDomains = (): Promise<any> => {
  return API.get(`/nomenclatures/domains`).then((res) => res.data);
};

export const getFaculties = (): Promise<any> => {
  return API.get(`/nomenclatures/faculties`).then((res) => res.data);
};
