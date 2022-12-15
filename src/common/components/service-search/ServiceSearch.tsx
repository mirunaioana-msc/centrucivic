import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from '../date-picker/DatePicker';
import SearchField from '../search-field/SearchField';
import MultiSelect from '../select/Select';
import ServerSelect from '../server-select/ServerSelect';
import { ServiceSearchConfig } from './configs/ServiceSearch.config';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { useNomenclature } from '../../../store/nomenclatures/Nomenclatures.selectors';
import { ISelectData, mapItemToSelect } from '../../helpers/Nomenclature.helper';
import { useTranslation } from 'react-i18next';
import {
  useCitiesQuery,
  useDomainsQuery,
  useFacultiesQuery,
} from '../../../services/nomenclature/Nomeclature.queries';
import ShapeWrapper from '../shape-wrapper/ShapeWrapper';
import ServiceFilterModal from '../service-filter-modal/ServiceFilterModal';
import { SERVICES_QUERY_PARAMS } from '../../constants/Services.constants';
import { useQueryParams, encodeQueryParams } from 'use-query-params';
import { getCities, getDomains } from '../../../services/nomenclature/Nomenclature.service';
import { AgeCategories } from '../../enums/AgeCategory.enum';
import { countFilters } from '../../helpers/Filters.helpers';
import { stringify } from 'query-string';

interface ServiceSearchProps {
  children?: React.ReactNode;
  onSearchCallback?: (search: string) => void;
}

const ServiceSearch = (props: ServiceSearchProps) => {
  const { t } = useTranslation('service_search');
  // filter modal state
  const [isFilterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [filtersCount, setFiltersCount] = useState<number>(0);

  // search state
  const [searchLocationTerm, seSearchtLocationTerm] = useState('');
  // nomenclature
  const { cities, domains } = useNomenclature();

  // query params state
  const [query, setQuery] = useQueryParams(SERVICES_QUERY_PARAMS);

  // form state
  const form = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = form;

  // Queries
  useCitiesQuery(searchLocationTerm);
  useDomainsQuery();
  useFacultiesQuery();

  useEffect(() => {
    (async () => {
      const filters = await initFilters();
      reset({ ...filters });
    })();
  }, []);

  const search = (data: any) => {
    // 1. map query values
    const selectedDomains = data?.domains?.map((domain: ISelectData) => domain.value);
    const selectedAgeCategories = data?.ageCategories?.map(
      (category: ISelectData) => category.value,
    );
    const queryValues = {
      search: data?.search.trim(),
      locationId: data?.locationId?.value,
      domains: selectedDomains?.length > 0 ? selectedDomains : undefined,
      ageCategories: selectedAgeCategories?.length > 0 ? selectedAgeCategories : undefined,
      start: data?.start,
      end: data?.end,
      page: 1,
    };

    // 2. set query params
    setQuery(queryValues);
    // 3 update filters cound
    setFiltersCount(countFilters(queryValues));

    props.onSearchCallback &&
      props.onSearchCallback(
        `?${stringify(encodeQueryParams(SERVICES_QUERY_PARAMS, queryValues))}`,
      );
  };

  const loadOptionsLocationSearch = async (searchWord: string) => {
    seSearchtLocationTerm(searchWord);
    return cities.map(mapItemToSelect);
  };

  // TODO: These operations should take place in each form cell which requires server data
  const initFilters = async () => {
    const {
      locationId,
      domains: queryDomains,
      ageCategories: queryAgeCategories,
      page,
      ...otherQueryParams
    } = query;

    // init should get me the correct values for
    let selectedLocationId, selectedCategories, selectedDomains;

    // 1. city
    if (locationId) {
      const citiesResults = await getCities({ cityId: locationId.toString() });
      selectedLocationId = mapItemToSelect(citiesResults[0]);
    }

    // 2. categories
    if (queryAgeCategories && queryAgeCategories?.length > 0) {
      selectedCategories = AgeCategories.filter((category) =>
        queryAgeCategories.includes(category.value),
      );
    }

    // 3. domains
    if (queryDomains && queryDomains?.length > 0) {
      const allDomains = await getDomains();
      selectedDomains = allDomains
        .filter((domain: { id: number; name: string }) => queryDomains?.includes(domain.id))
        .map(mapItemToSelect);
    }

    setFiltersCount(page ? countFilters(query) - 1 : countFilters(query));

    return {
      locationId: selectedLocationId,
      domains: selectedDomains,
      ageCategories: selectedCategories,
      ...otherQueryParams,
    };
  };

  return (
    <>
      <div className="bg-yellow w-full flex flex-col items-center px-2 sm:px-4 sm:py-14 py-10 gap-8 bg-search bg-no-repeat bg-cover bg-center">
        <div className="flex flex-col w-full items-center gap-2">
          <p className="font-titilliumBold sm:text-4xl text-xl text-black">{t('title')}</p>
          <p className="font-titillium sm:text-xl text-black">
            {t('subtitle')}
            <a className="text-black underline cursor-pointer" href="/services">
              {t('subtitle_link')}
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-4 max-w-5xl w-full justify-items-center">
          <div className="flex w-full items-center h-14">
            <Controller
              key={ServiceSearchConfig.search.key}
              name={ServiceSearchConfig.search.key}
              rules={ServiceSearchConfig.search.rules}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <SearchField
                    config={{
                      ...ServiceSearchConfig.search.config,
                      name: ServiceSearchConfig.search.key,
                      error: errors[ServiceSearchConfig.search.key]?.message,
                      defaultValue: value,
                      onChange: onChange,
                      id: 'programs-search-search__term',
                    }}
                  />
                );
              }}
            />
            <button
              type="button"
              className="text-sm sm:text-base sm:hidden text-yellow bg-black  px-4 flex items-center justify-center h-full"
              onClick={handleSubmit(search)}
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            <div className="w-1/3 h-14 hidden sm:flex">
              <Controller
                key={ServiceSearchConfig.locationId.key}
                name={ServiceSearchConfig.locationId.key}
                rules={ServiceSearchConfig.locationId.rules}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <ServerSelect
                      id="programs-search-location"
                      value={value}
                      isMulti={false}
                      isClearable={false}
                      placeholder={ServiceSearchConfig.locationId.placeholder}
                      onChange={onChange}
                      loadOptions={loadOptionsLocationSearch}
                      addOn={ServiceSearchConfig.locationId.addOn}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div
            className="sm:hidden flex justify-flex-start h-14 items-center bg-white px-4 gap-2 rounded-md shadow w-fit cursor-pointer active:bg-gray-200"
            onClick={() => setFilterModalOpen(true)}
          >
            <p
              id="search-services-activity__button-back"
              className="text-sm sm:text-base  h-full flex items-center"
            >
              {t('filters')}
            </p>
            <AdjustmentsIcon className="w-5 h-5" />
            {filtersCount > 0 && (
              <p
                id="search-services-activity__button-back"
                className="text-base rounded-full bg-yellow p-2 flex items-center w-10 justify-center"
              >
                {filtersCount}
              </p>
            )}
          </div>

          <div className="hidden sm:flex w-full h-14 items-center">
            <Controller
              key={ServiceSearchConfig.domains.key}
              name={ServiceSearchConfig.domains.key}
              rules={ServiceSearchConfig.domains.rules}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <MultiSelect
                    id="search-services-domains"
                    value={value}
                    isClearable={false}
                    isMulti={true}
                    onChange={onChange}
                    placeholder={ServiceSearchConfig.domains.config.placeholder}
                    options={domains.map(mapItemToSelect)}
                    icon={ServiceSearchConfig.domains.icon}
                  />
                );
              }}
            />
            <Controller
              key={ServiceSearchConfig.start.key}
              name={ServiceSearchConfig.start.key}
              rules={ServiceSearchConfig.start.rules}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePicker
                    defaultValue={value ? value : undefined}
                    onChange={onChange}
                    placeholder={ServiceSearchConfig.start.placeholder}
                  />
                );
              }}
            />
            <Controller
              key={ServiceSearchConfig.end.key}
              name={ServiceSearchConfig.end.key}
              rules={ServiceSearchConfig.end.rules}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePicker
                    defaultValue={value ? value : undefined}
                    onChange={onChange}
                    placeholder={ServiceSearchConfig.end.placeholder}
                  />
                );
              }}
            />
            <Controller
              key={ServiceSearchConfig.ageCategories.key}
              name={ServiceSearchConfig.ageCategories.key}
              rules={ServiceSearchConfig.ageCategories.rules}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <MultiSelect
                    id="search-services-ageCategories"
                    value={value}
                    isClearable={false}
                    isMulti={true}
                    onChange={onChange}
                    placeholder={ServiceSearchConfig.ageCategories.config.placeholder}
                    options={ServiceSearchConfig.ageCategories.config.collection}
                    icon={ServiceSearchConfig.ageCategories.icon}
                  />
                );
              }}
            />

            <button
              id="search-services-activity__button-back"
              type="button"
              className="yellow-button text-sm sm:text-base w-full h-full"
              onClick={handleSubmit(search)}
            >
              {t('searchWord')}
            </button>
          </div>
        </div>
        {isFilterModalOpen && (
          <ServiceFilterModal
            onClose={() => {
              setFilterModalOpen(false);
            }}
          />
        )}
      </div>
      <ShapeWrapper>{props.children}</ShapeWrapper>
    </>
  );
};

export default ServiceSearch;
