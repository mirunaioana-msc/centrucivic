import {
  ArrayParam,
  DateParam,
  DelimitedNumericArrayParam,
  NumberParam,
  StringParam,
} from 'use-query-params';

export const SERVICES_QUERY_PARAMS = {
  search: StringParam,
  ageCategories: ArrayParam,
  locationId: NumberParam,
  start: DateParam,
  end: DateParam,
  domains: DelimitedNumericArrayParam,
};
