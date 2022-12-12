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
import { mapItemToSelect } from '../../helpers/Nomenclature.helper';
import { useTranslation } from 'react-i18next';
import {
  useCitiesQuery,
  useDomainsQuery,
  useFacultiesQuery,
} from '../../../services/nomenclature/Nomeclature.queries';
import ShapeWrapper from '../shape-wrapper/ShapeWrapper';
import useStore from '../../../store/Store';
import { useServices } from '../../../store/Selectors';
import ServiceFilterModal from '../service-filter-modal/ServiceFilterModal';
import { handleEnterKey } from '../../helpers/Format.helper';

interface ServiceSearchProps {
  showFilters: boolean;
  preloadData?: boolean;
  children?: React.ReactNode;
  onSearchCallback?: () => void;
}

const ServiceSearch = (props: ServiceSearchProps) => {
  const { t } = useTranslation('service_search');
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [searchLocationTerm, seSearchtLocationTerm] = useState('');
  const [filtersCount, setFiltersCount] = useState(0);
  const { cities, domains } = useNomenclature();
  const { updateServicesFilters } = useStore();
  const { filters: activeFilters } = useServices();

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
  useFacultiesQuery();

  useEffect(() => {
    reset({ ...activeFilters });
  }, []);

  const search = (data: any) => {
    updateServicesFilters(
      data.search,
      data.locationId,
      data.domains,
      data.start,
      data.end,
      data.ageCategories,
    );
    props.onSearchCallback && props.onSearchCallback();
  };

  const loadOptionsLocationSearch = async (searchWord: string) => {
    seSearchtLocationTerm(searchWord);
    return cities.map(mapItemToSelect);
  };

  useEffect(() => {
    const count = [
      activeFilters.locationId,
      activeFilters.domains?.length,
      activeFilters.start,
      activeFilters.end,
    ].filter(Boolean).length;
    setFiltersCount(count);
    reset({ ...activeFilters });
  }, [activeFilters]);

  handleEnterKey('services-search__term__input', 'services-search__button__submit');

  return (
    <>
      <div className="bg-yellow w-full flex flex-col items-center px-2 sm:px-4 sm:py-14 py-10 gap-8 bg-search bg-no-repeat bg-cover bg-center">
        <div className="flex flex-col w-full items-center gap-2">
          <p className="font-titilliumBold sm:text-4xl text-xl text-black">{t('title')}</p>
          <p className="font-titillium sm:text-2xl sm:text-xl text-black">
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
                      id: 'services-search__term',
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
                <SearchIcon className="w-5 h-5" />
              </button>
            )}

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
          {props.showFilters && (
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
          )}

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
              id="services-search__button__submit"
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
