import { DateParam, DelimitedNumericArrayParam, NumberParam, StringParam } from 'use-query-params';

export const SERVICES_QUERY_PARAMS = {
  search: StringParam,
  group: StringParam,
  beneficiaries: DelimitedNumericArrayParam,
  locationId: NumberParam,
  start: DateParam,
  end: DateParam,
  domains: DelimitedNumericArrayParam,
};
