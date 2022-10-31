import useStore from "../Store";

export const useNomenclature = () => {
  const cities = useStore((state) => state.cities);
  const domains = useStore((state) => state.domains);
  const faculties = useStore((state) => state.faculties);
  return { cities, domains, faculties };
};
