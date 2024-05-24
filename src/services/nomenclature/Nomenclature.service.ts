import API from '../API';

export const getCities = (params: { search?: string; cityId?: string }): Promise<any> => {
  return API.get(`/nomenclatures/cities`, {
    params,
  }).then((res) => res.data);
};

export const getDomains = (): Promise<any> => {
  return API.get(`/nomenclatures/domains`).then((res) => res.data);
};

export const getFaculties = (): Promise<any> => {
  return API.get(`/nomenclatures/faculties`).then((res) => res.data);
};

export const getServiceDomains = (): Promise<any> => {
  return API.get(`/nomenclatures/service-domains`).then((res) => res.data);
};

export const getBeneficiaries = (): Promise<any> => {
  return API.get(`/nomenclatures/beneficiaries`).then((res) => res.data);
};
