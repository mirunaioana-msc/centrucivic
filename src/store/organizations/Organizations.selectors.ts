import useStore from "../Store";

export const useOrganizations = () => {
  const organizations = useStore((state) => state.organizations);
  return { organizations };
};
