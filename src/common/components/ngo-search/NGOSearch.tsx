import React, { useEffect, useState } from 'react'
import { SearchIcon } from '@heroicons/react/solid';
import { Controller, useForm } from 'react-hook-form';
import SearchField from '../search-field/SearchField';
import MultiSelect from '../select/Select';
import ServerSelect from '../server-select/ServerSelect';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { useServices } from '../../../store/Selectors';
import { useNomenclature } from '../../../store/nomenclatures/Nomenclatures.selectors';
import { mapItemToSelect, mapSelectToValue } from '../../helpers/Nomenclature.helper';
import { useTranslation } from 'react-i18next';
import { useCitiesQuery, useDomainsQuery, useFacultiesQuery } from '../../../services/nomenclature/Nomeclature.queries';
import { NGOSearchConfig } from './configs/NGOSearch.config';
import NGOFilterModal from '../ngo-filter-modal/NGOFilterModal';
import { useOrganizationQuery } from '../../../services/organization/Organization.queries';

const NGOSearch = (props: { showFilters: boolean }) => {
  const { t } = useTranslation();
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [searchLocationTerm, seSearchtLocationTerm] = useState('');
  const [locationId, setLocationId] = useState();
  const [selectedDomains, setSelectedDomains] = useState();
  const [filtersCount, setFiltersCount] = useState(0);
  const [filters, setFilters] = useState<any>();

  // Search Params
  const [page, setPage] = useState<number>();
  const [rowsPerPage, setRowsPerPage] = useState<number>();

  const { meta } = useServices();
  const { cities, domains } = useNomenclature();

  useOrganizationQuery(
    rowsPerPage as number,
    page as number,
    searchTerm,
    locationId,
    selectedDomains,
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  // Queries
  useCitiesQuery(searchLocationTerm)
  useDomainsQuery();
  useFacultiesQuery();

  const search = (data: any) => {
    setFilters(data);
    setPage(meta.currentPage);
    setRowsPerPage(meta.itemsPerPage);
    setSearchTerm(data.search);
    setLocationId(data.locationId?.value);
    setSelectedDomains(data.domains?.map(mapSelectToValue));
  }

  const loadOptionsLocationSearch = async (searchWord: string) => {
    seSearchtLocationTerm(searchWord);
    return cities.map(mapItemToSelect)
  };

  const receiveFiltersFromModal = (e: any) => {
    setFilterModalOpen(false);
    setFilters(e);
    reset(e);
    handleSubmit(search)();
  }

  useEffect(() => {
    setFiltersCount([locationId,
      selectedDomains].filter(Boolean).length)
  }, [locationId, selectedDomains])

  return (
    <div className='bg-yellow w-full flex flex-col items-center px-2 sm:px-4 py-10 gap-8'>
      <p className='font-titilliumBold sm:text-4xl text-xl  text-black'>{t('ngo-search:title')}</p>
      <div className='flex flex-col gap-4 max-w-5xl w-full justify-items-center'>
        <div className='flex w-full items-center h-14'>
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
                    id: 'programs-search-search__term',
                  }}
                />
              );
            }}
          />
          {props.showFilters && (
            <button
              type="button"
              className="text-sm sm:text-base sm:hidden text-yellow bg-black  px-4 flex items-center justify-center h-full"
              onClick={handleSubmit(search)}
            >
              <SearchIcon className='w-5 h-5' />
            </button>
          )}

          <div className='w-1/3 h-14 hidden sm:flex'>
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
        {props.showFilters && (
          <div className='sm:hidden flex justify-flex-start h-14 items-center bg-white px-4 gap-2 rounded-md shadow w-fit cursor-pointer active:bg-gray-200'
            onClick={() => setFilterModalOpen(true)}>
            <p
              id="create-organization-activity__button-back"
              className="text-sm sm:text-base  h-full flex items-center"
            >
              {t('practice-programs-search:filters')}
            </p>
            <AdjustmentsIcon className='w-5 h-5' />
            {filtersCount > 0 && <p
              id="create-organization-activity__button-back"
              className="text-base rounded-full bg-yellow p-2 flex items-center w-10 items-center justify-center"
            >
              {filtersCount}
            </p>}
          </div>
        )}

        <div className='hidden sm:flex w-full h-14 items-center h-14'>
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
                />
              );
            }}
          />
          <button
            id="create-organization-activity__button-back"
            type="button"
            className="text-sm sm:text-xl text-yellow bg-black px-6 h-full sm:w-56 w-24"
            onClick={handleSubmit(search)}
          >
            {t('practice-programs-search:searchWord')}
          </button>
        </div>
      </div>
      {isFilterModalOpen && (
        <NGOFilterModal
          filters={filters}
          onClose={() => { setFilterModalOpen(false) }}
          onConfirm={(e: any) => { receiveFiltersFromModal(e) }}
        />
      )}
    </div>)
}

export default NGOSearch;