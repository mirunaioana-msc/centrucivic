import { useQuery } from '@tanstack/react-query';
import { City } from '../../common/interfaces/City.interface';
import { Domain } from '../../common/interfaces/Domain.interface';
import { Faculty } from '../../common/interfaces/Faculty.interface';
import useStore from '../../store/Store';
import { getCities, getDomains, getFaculties } from './Nomenclature.service';

export const useCitiesQuery = (searchTerm: string) => {
  const { setCities } = useStore();
  return useQuery(['cities', searchTerm], () => getCities({ search: searchTerm }), {
    onSuccess: (data: City[]) => {
      setCities(data);
    },
    enabled: !!searchTerm,
  });
};

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
