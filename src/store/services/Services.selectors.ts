import useStore from "../Store";

export const useServices = () => {
  const services = useStore((state) => state.services.items);
  const filters = useStore((state) => state.services.filters);
  const meta = useStore((state) => state.services.meta);
  return { services, filters, meta };
};
