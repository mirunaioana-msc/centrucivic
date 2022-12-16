import { useQuery } from '@tanstack/react-query';
import { Domain } from '../../common/interfaces/Domain.interface';
import { Faculty } from '../../common/interfaces/Faculty.interface';
import useStore from '../../store/Store';
import { getDomains, getFaculties } from './Nomenclature.service';

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
