import { DelimitedNumericArrayParam, NumberParam, StringParam } from 'use-query-params';

export const ORGANIZATIONS_QUERY_PARAMS = {
  search: StringParam,
  locationId: NumberParam,
  domains: DelimitedNumericArrayParam,
};
