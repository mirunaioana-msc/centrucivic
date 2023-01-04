// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const breadcrumbsSlice = (set: any) => ({
  organizationName: null,
  serviceName: null,
  setOrganizationName: (organizationName: string) => {
    set({ organizationName });
  },
  setServiceName: (serviceName: string) => {
    set({ serviceName });
  },
});

export default { breadcrumbsSlice };
