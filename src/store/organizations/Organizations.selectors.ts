import useStore from '../Store';

export const useOrganizations = () => {
  const organizations = useStore((state) => state.organizations.items);
  const filters = useStore((state) => state.organizations.filters);
  const meta = useStore((state) => state.organizations.meta);
  return { organizations, filters, meta };
};

export const useSelectedOrganization = () => {
  const selectedOrganization = useStore((state) => state.selectedOrganization);
  return { selectedOrganization };
}