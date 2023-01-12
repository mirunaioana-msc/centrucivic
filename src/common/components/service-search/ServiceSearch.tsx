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
  useDomainsQuery,
  useFacultiesQuery,
} from '../../../services/nomenclature/Nomeclature.queries';
import ServiceFilterModal from '../service-filter-modal/ServiceFilterModal';
import { SERVICES_QUERY_PARAMS } from '../../constants/Services.constants';
import { useQueryParams, encodeQueryParams } from 'use-query-params';
import { getCities, getDomains } from '../../../services/nomenclature/Nomenclature.service';
import { AgeCategories } from '../../enums/AgeCategory.enum';
import { countFilters } from '../../helpers/Filters.helpers';
import { stringify } from 'query-string';
import { mapCitiesToSelect } from '../../helpers/Format.helper';

interface ServiceSearchProps {
  onSearchCallback?: (search: string) => void;
}

const ServiceSearch = (props: ServiceSearchProps) => {
  const { t } = useTranslation(['service_search', 'common']);
  // filter modal state
  const [isFilterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [filtersCount, setFiltersCount] = useState<number>(0);

  // nomenclature
  const { domains } = useNomenclature();

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
      search: data?.search?.trim() || undefined,
      locationId: data?.locationId?.value || undefined,
      domains: selectedDomains?.length > 0 ? selectedDomains : undefined,
      ageCategories: selectedAgeCategories?.length > 0 ? selectedAgeCategories : undefined,
      start: data?.start || undefined,
      end: data?.end || undefined,
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
    return getCities({ search: searchWord }).then((cities) => cities.map(mapCitiesToSelect));
  };

  // TODO: These operations should take place in each form cell which requires server data
  const initFilters = async () => {
    const {
      locationId,
      domains: queryDomains,
      ageCategories: queryAgeCategories,
      ...otherQueryParams
    } = query;

    // init should get me the correct values for
    let selectedLocationId, selectedCategories, selectedDomains;

    // 1. city
    if (locationId) {
      const citiesResults = await getCities({ cityId: locationId.toString() });
      selectedLocationId = mapCitiesToSelect(citiesResults[0]);
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

    setFiltersCount(countFilters(query));

    return {
      locationId: selectedLocationId,
      domains: selectedDomains,
      ageCategories: selectedCategories,
      ...otherQueryParams,
    };
  };

  return (
    <div className="bg-yellow w-full items-center bg-search bg-no-repeat bg-cover bg-center">
      <div className="wrapper 2xl:w-[70%] lg:max-w-screen-lg">
        <div className="grid w-full gap-2 text-center">
          <p className="font-titilliumBold sm:text-4xl text-xl text-black">{t('title')}</p>
          <p className="font-titillium sm:text-xl text-black sm:text-center text-left">
            {t('subtitle')}
            <a
              aria-label={t('subtitle_link')}
              className="text-black underline cursor-pointer"
              href="/services"
            >
              {t('subtitle_link')}
            </a>
          </p>
        </div>
        <div className="grid gap-4 w-full sm:items-center">
          <div className="flex w-full items-center h-14">
            <div className="sm:w-3/4 w-full">
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
                        id: 'services-search__term',
                        onKeyUp: handleSubmit(search),
                      }}
                    />
                  );
                }}
              />
            </div>
            <button
              aria-label={t('search.search_button', { ns: 'common' })}
              type="button"
              className="text-sm sm:text-base sm:hidden text-yellow bg-black px-4 flex items-center justify-center h-full shadow-md"
              onClick={handleSubmit(search)}
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            <div className="w-1/4 h-14 hidden sm:flex">
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
                      isClearable
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
              className="text-sm sm:text-base h-full flex items-center"
            >
              {t('search.filters', { ns: 'common' })}
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

          <div className="hidden sm:grid sm:grid-cols-5 w-full h-14 items-center">
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
                    isClearable
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
                    isClearable
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
              aria-label={t('search.search_button', { ns: 'common' })}
              id="services-search__button__submit"
              type="button"
              className="yellow-button text-sm sm:text-base w-full h-full shadow-md rounded-none"
              onClick={handleSubmit(search)}
            >
              {t('search.search_button', { ns: 'common' })}
            </button>
          </div>
        </div>
      </div>

      {isFilterModalOpen && (
        <ServiceFilterModal
          onClose={() => {
            setFilterModalOpen(false);
          }}
          form={form}
          onSubmit={search}
        />
      )}
    </div>
  );
};

export default ServiceSearch;
