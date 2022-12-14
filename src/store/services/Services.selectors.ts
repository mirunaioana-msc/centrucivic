import useStore from '../Store';

export const useServices = () => {
  const services = useStore((state) => state.services.items);
  const meta = useStore((state) => state.services.meta);
  return { services, meta };
};

export const useSelectedService = () => {
  const selectedService = useStore((state) => state.selectedService);
  return { selectedService };
};
