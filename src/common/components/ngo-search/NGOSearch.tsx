import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { Controller, useForm } from 'react-hook-form';
import SearchField from '../search-field/SearchField';
import MultiSelect from '../select/Select';
import ServerSelect from '../server-select/ServerSelect';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { useOrganizations } from '../../../store/Selectors';
import { useNomenclature } from '../../../store/nomenclatures/Nomenclatures.selectors';
import { mapItemToSelect } from '../../helpers/Nomenclature.helper';
import { useTranslation } from 'react-i18next';
import {
  useCitiesQuery,
  useDomainsQuery,
} from '../../../services/nomenclature/Nomeclature.queries';
import { NGOSearchConfig } from './configs/NGOSearch.config';
import NGOFilterModal from '../ngo-filter-modal/NGOFilterModal';
import useStore from '../../../store/Store';
import ShapeWrapper from '../shape-wrapper/ShapeWrapper';
import { handleEnterKey } from '../../helpers/Format.helper';

interface NGOSearchProps {
  showFilters: boolean;
  children?: React.ReactNode;
}

const NGOSearch = ({ showFilters, children }: NGOSearchProps) => {
  const { t } = useTranslation();
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [searchLocationTerm, seSearchtLocationTerm] = useState('');
  const [filtersCount, setFiltersCount] = useState(0);

  // store hooks
  const { filters: activeFilters } = useOrganizations();
  const { updateOrganizationFilters } = useStore();
  const { cities, domains } = useNomenclature();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // Queries
  useCitiesQuery(searchLocationTerm);
  useDomainsQuery();

  const search = (data: any) => {
    updateOrganizationFilters(data.search, data.locationId, data.domains);
  };

  const loadOptionsLocationSearch = async (searchWord: string) => {
    seSearchtLocationTerm(searchWord);
    return cities.map(mapItemToSelect);
  };

  useEffect(() => {
    setFiltersCount(
      [activeFilters.locationId, activeFilters.domains?.length].filter(Boolean).length,
    );
    reset({ ...activeFilters });
  }, [activeFilters.domains, activeFilters.locationId, activeFilters.search]);

  handleEnterKey('organizations-search__term__input', 'organizations-search__button__submit');

  return (
    <>
      <div className="bg-yellow w-full flex flex-col items-center px-2 sm:px-4 py-10 gap-8 bg-search bg-no-repeat bg-cover bg-center">
        <p className="title">{t('ngo_search:title')}</p>
        <div className="flex flex-col gap-4 max-w-5xl w-full justify-items-center">
          <div className="flex w-full items-center h-14">
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
                    }}
                  />
                );
              }}
            />
            {showFilters && (
              <button
                type="button"
                className="text-sm sm:text-base sm:hidden text-yellow bg-black  px-4 flex items-center justify-center h-full"
                onClick={handleSubmit(search)}
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            )}

            <div className="w-1/3 h-14 hidden sm:flex">
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
                      isClearable={false}
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
                {t('service_search:filters')}
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
                    isClearable={false}
                    isMulti={true}
                    onChange={onChange}
                    placeholder={NGOSearchConfig.domains.config.placeholder}
                    options={domains.map(mapItemToSelect)}
                    icon={NGOSearchConfig.domains.icon}
                  />
                );
              }}
            />
            <button
              id="organizations-search__button__submit"
              type="button"
              className="text-sm sm:text-xl text-yellow bg-black px-6 h-full sm:w-56 w-24"
              onClick={handleSubmit(search)}
            >
              {t('ngo_search:searchWord')}
            </button>
          </div>
        </div>
        {isFilterModalOpen && (
          <NGOFilterModal
            onClose={() => {
              setFilterModalOpen(false);
            }}
          />
        )}
      </div>
      <ShapeWrapper>{children}</ShapeWrapper>
    </>
  );
};

export default NGOSearch;
