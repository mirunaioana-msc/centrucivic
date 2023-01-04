import useStore from '../Store';

export const useBreadcrumbsState = () => {
  const organizationName = useStore((state) => state.organizationName);
  const serviceName = useStore((state) => state.serviceName);
  return { organizationName, serviceName };
};
