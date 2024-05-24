import { useQuery } from '@tanstack/react-query';
import { Domain } from '../../common/interfaces/Domain.interface';
import { Faculty } from '../../common/interfaces/Faculty.interface';
import useStore from '../../store/Store';
import {
  getBeneficiaries,
  getDomains,
  getFaculties,
  getServiceDomains,
} from './Nomenclature.service';

export const useDomainsQuery = () => {
  const { setDomains } = useStore();
  return useQuery(['domains'], () => getDomains(), {
    onSuccess: (data: Domain[]) => {
      setDomains(data);
    },
  });
};

export const useFacultiesQuery = () => {
  const { setFaculties } = useStore();
  return useQuery(['faculties'], () => getFaculties(), {
    onSuccess: (data: Faculty[]) => {
      setFaculties(data);
    },
  });
};

export const useServiceDomainsQuery = () => {
  return useQuery(['service-domains'], () => getServiceDomains(), {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });
};

export const useBeneficiariesQuery = () => {
  return useQuery(['beneficiaries'], () => getBeneficiaries(), {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });
};
