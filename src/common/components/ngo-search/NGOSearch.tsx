import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { Controller, useForm } from 'react-hook-form';
import SearchField from '../search-field/SearchField';
import MultiSelect from '../select/Select';
import ServerSelect from '../server-select/ServerSelect';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { useNomenclature } from '../../../store/nomenclatures/Nomenclatures.selectors';
import { ISelectData, mapItemToSelect } from '../../helpers/Nomenclature.helper';
import { useTranslation } from 'react-i18next';
import { useDomainsQuery } from '../../../services/nomenclature/Nomeclature.queries';
import { NGOSearchConfig } from './configs/NGOSearch.config';
import NGOFilterModal from '../ngo-filter-modal/NGOFilterModal';
import ShapeWrapper from '../shape-wrapper/ShapeWrapper';
import { ORGANIZATIONS_QUERY_PARAMS } from '../../constants/Organizations.constants';
import { useQueryParams } from 'use-query-params';
import { countFilters } from '../../helpers/Filters.helpers';
import { getCities, getDomains } from '../../../services/nomenclature/Nomenclature.service';
import { mapCitiesToSelect } from '../../helpers/Format.helper';

interface NGOSearchProps {
  showFilters: boolean;
  children?: React.ReactNode;
}

const NGOSearch = ({ showFilters, children }: NGOSearchProps) => {
  const { t } = useTranslation();

  // filters state
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [filtersCount, setFiltersCount] = useState(0);

  // nomenclature state
  const { domains } = useNomenclature();

  // query params state
  const [query, setQuery] = useQueryParams(ORGANIZATIONS_QUERY_PARAMS);

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

  useEffect(() => {
    (async () => {
      const filters = await initFilters();
      reset({ ...filters });
    })();
  }, []);

  const search = (data: any) => {
    // 1. map query values
    const selectedDomains = data?.domains?.map((domain: ISelectData) => domain.value);
    const queryValues = {
      search: data?.search?.trim(),
      locationId: data?.locationId?.value,
      domains: selectedDomains?.length > 0 ? selectedDomains : undefined,
      page: 1,
    };

    // 2. set query params
    setQuery(queryValues);
    // 3 update filters cound
    setFiltersCount(countFilters(queryValues));
  };

  const loadOptionsLocationSearch = async (searchWord: string) => {
    return getCities({ search: searchWord }).then((cities) => cities.map(mapCitiesToSelect));
  };

  const initFilters = async () => {
    const { locationId, domains: queryDomains, page, ...otherQueryParams } = query;

    // init should get me the correct values for
    let selectedLocation, selectedDomains;

    // 1. city
    if (locationId) {
      const citiesResults = await getCities({ cityId: locationId.toString() });
      selectedLocation = mapCitiesToSelect(citiesResults[0]);
    }

    // 4. domains
    if (queryDomains && queryDomains?.length > 0) {
      const allDomains = await getDomains();
      selectedDomains = allDomains
        .filter((domain: { id: number; name: string }) => queryDomains?.includes(domain.id))
        .map(mapItemToSelect);
    }

    setFiltersCount(countFilters(query));

    return {
      locationId: selectedLocation,
      domains: selectedDomains,
      ...otherQueryParams,
    };
  };

  return (
    <>
      <div className="bg-yellow w-full flex flex-col items-center px-2 sm:px-4 py-10 gap-8 bg-search bg-no-repeat bg-cover bg-center">
        <p className="title">{t('ngo_search:title')}</p>
        <div className="flex flex-col gap-4 max-w-5xl w-full justify-items-center">
          <div className="flex w-full items-center h-14">
            <div className="sm:w-3/4 w-full">
              <Controller
                key={NGOSearchConfig.search.key}
                name={NGOSearchConfig.search.key}
                rules={NGOSearchConfig.search.rules}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <SearchField
                      config={{
                        ...NGOSearchConfig.search.config,
                        name: NGOSearchConfig.search.key,
                        error: errors[NGOSearchConfig.search.key]?.message,
                        defaultValue: value,
                        onChange: onChange,
                        id: 'organizations-search__term',
                        onKeyUp: handleSubmit(search),
                      }}
                    />
                  );
                }}
              />
            </div>
            {showFilters && (
              <button
                type="button"
                className="text-sm sm:text-base sm:hidden text-yellow bg-black px-4 flex items-center justify-center h-full shadow-md"
                onClick={handleSubmit(search)}
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            )}

            <div className="w-1/4 h-14 hidden sm:flex">
              <Controller
                key={NGOSearchConfig.locationId.key}
                name={NGOSearchConfig.locationId.key}
                rules={NGOSearchConfig.locationId.rules}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <ServerSelect
                      id="programs-search-location"
                      value={value}
                      isMulti={false}
                      isClearable
                      placeholder={NGOSearchConfig.locationId.placeholder}
                      onChange={onChange}
                      loadOptions={loadOptionsLocationSearch}
                      addOn={NGOSearchConfig.locationId.addOn}
                    />
                  );
                }}
              />
            </div>
          </div>
          {showFilters && (
            <div
              className="sm:hidden flex justify-flex-start h-14 items-center bg-white px-4 gap-2 rounded-md shadow w-fit cursor-pointer active:bg-gray-200"
              onClick={() => setFilterModalOpen(true)}
            >
              <p
                id="create-organization-activity__button-back"
                className="text-sm sm:text-base  h-full flex items-center"
              >
                {t('common:search.filters')}
              </p>
              <AdjustmentsIcon className="w-5 h-5" />
              {filtersCount > 0 && (
                <p
                  id="create-organization-activity__button-back"
                  className="text-base rounded-full bg-yellow p-2 flex items-center w-10 justify-center"
                >
                  {filtersCount}
                </p>
              )}
            </div>
          )}

          <div className="hidden sm:flex w-full h-14 items-center">
            <div className="w-5/6">
              <Controller
                key={NGOSearchConfig.domains.key}
                name={NGOSearchConfig.domains.key}
                rules={NGOSearchConfig.domains.rules}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <MultiSelect
                      id="create-organization-domains"
                      value={value}
                      isClearable
                      isMulti={true}
                      onChange={onChange}
                      placeholder={NGOSearchConfig.domains.config.placeholder}
                      options={domains.map(mapItemToSelect)}
                      icon={NGOSearchConfig.domains.icon}
                    />
                  );
                }}
              />
            </div>
            <button
              id="organizations-search__button__submit"
              type="button"
              className="text-sm sm:text-base text-yellow bg-black px-6 h-full sm:w-1/6 w-24 hover:bg-black-800"
              onClick={handleSubmit(search)}
            >
              {t('common:search.search_button')}
            </button>
          </div>
        </div>
        {isFilterModalOpen && (
          <NGOFilterModal
            onClose={() => {
              setFilterModalOpen(false);
            }}
            form={form}
            onSubmit={search}
          />
        )}
      </div>
      <ShapeWrapper>{children}</ShapeWrapper>
    </>
  );
};

export default NGOSearch;
