import useStore from '../Store';

export const useOrganizations = () => {
  const organizations = useStore((state) => state.organizations.items);
  const meta = useStore((state) => state.organizations.meta);
  return { organizations, meta };
};

export const useSelectedOrganization = () => {
  const selectedOrganization = useStore((state) => state.selectedOrganization);
  return { selectedOrganization };
};
