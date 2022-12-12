import API from '../API';

export const getCities = (search?: string, cityId?: string): Promise<any> => {
  return API.get(`/nomenclatures/cities`, {
    params: {
      search,
      cityId,
    },
  }).then((res) => res.data);
};

export const getDomains = (): Promise<any> => {
  return API.get(`/nomenclatures/domains`).then((res) => res.data);
};

export const getFaculties = (): Promise<any> => {
  return API.get(`/nomenclatures/faculties`).then((res) => res.data);
};
