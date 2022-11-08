import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from '../date-picker/DatePicker';
import SearchField from '../search-field/SearchField';
import MultiSelect from '../select/Select';
import ServerSelect from '../server-select/ServerSelect';
import { PracticeProgramsSearchConfig } from './configs/PracticeProgramsSearch.config';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { usePracticeProgramsQuery } from '../../../services/practice-programs/PracticePrograms.queries';
import { usePracticePrograms } from '../../../store/Selectors';
import { useNomenclature } from '../../../store/nomenclatures/Nomenclatures.selectors';
import { mapItemToSelect, mapSelectToValue } from '../../helpers/Nomenclature.helper';
import { useTranslation } from 'react-i18next';
import {
  useCitiesQuery,
  useDomainsQuery,
  useFacultiesQuery,
} from '../../../services/nomenclature/Nomeclature.queries';
import PracticeProgramFilterModal from '../practice-program-filter-modal/PracticeProgramFilterModal';

const PracticeProgramsSearch = (props: { showFilters: boolean }) => {
  const { t } = useTranslation();
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [searchLocationTerm, seSearchtLocationTerm] = useState('');
  const [locationId, setLocationId] = useState();
  const [selectedFaculties, setSelectedFaculties] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [workingHours, setWorkingHours] = useState();
  const [selectedDomains, setSelectedDomains] = useState();
  const [filtersCount, setFiltersCount] = useState(0);
  const [filters, setFilters] = useState<any>();

  // Search Params
  const [page, setPage] = useState<number>();
  const [rowsPerPage, setRowsPerPage] = useState<number>();

  const { practicePrograms } = usePracticePrograms();
  const { cities, domains, faculties } = useNomenclature();

  usePracticeProgramsQuery(
    rowsPerPage as number,
    page as number,
    searchTerm,
    locationId,
    selectedFaculties,
    workingHours,
    selectedDomains,
    start,
    end,
  );

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

  const search = (data: any) => {
    setFilters(data);
    setPage(practicePrograms.meta.currentPage);
    setRowsPerPage(practicePrograms.meta.itemsPerPage);
    setSearchTerm(data.search);
    setLocationId(data.locationId?.value);
    setSelectedFaculties(data.faculties?.map(mapSelectToValue));
    setSelectedDomains(data.domains?.map(mapSelectToValue));
    setWorkingHours(data.workingHours);
    setStart(data.start);
    setEnd(data.end);
  };

  const loadOptionsLocationSearch = async (searchWord: string) => {
    seSearchtLocationTerm(searchWord);
    return cities.map(mapItemToSelect);
  };

  const receiveFiltersFromModal = (e: any) => {
    setFilterModalOpen(false);
    setFilters(e);
    reset(e);
    handleSubmit(search)();
  };

  useEffect(() => {
    setFiltersCount(
      [locationId, selectedFaculties, workingHours, selectedDomains, start, end].filter(Boolean)
        .length,
    );
  }, [locationId, selectedFaculties, workingHours, selectedDomains, start, end]);

  return (
    <div className="bg-search w-full flex flex-col items-center px-2 sm:px-4 py-10 gap-8">
      <p className="font-titilliumBold sm:text-4xl text-xl  text-black">
        {t('practice-programs-search:title')}
      </p>
      <div className="flex flex-col gap-4 max-w-5xl w-full justify-items-center">
        <div className="flex w-full items-center h-14">
          <Controller
            key={PracticeProgramsSearchConfig.search.key}
            name={PracticeProgramsSearchConfig.search.key}
            rules={PracticeProgramsSearchConfig.search.rules}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <SearchField
                  config={{
                    ...PracticeProgramsSearchConfig.search.config,
                    name: PracticeProgramsSearchConfig.search.key,
                    error: errors[PracticeProgramsSearchConfig.search.key]?.message,
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
              <SearchIcon className="w-5 h-5" />
            </button>
          )}

          <div className="w-1/3 h-14 hidden sm:flex">
            <Controller
              key={PracticeProgramsSearchConfig.locationId.key}
              name={PracticeProgramsSearchConfig.locationId.key}
              rules={PracticeProgramsSearchConfig.locationId.rules}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <ServerSelect
                    id="programs-search-location"
                    value={value}
                    isMulti={false}
                    isClearable={false}
                    placeholder={PracticeProgramsSearchConfig.locationId.placeholder}
                    onChange={onChange}
                    loadOptions={loadOptionsLocationSearch}
                    addOn={PracticeProgramsSearchConfig.locationId.addOn}
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
              id="create-organization-activity__button-back"
              className="text-sm sm:text-base  h-full flex items-center"
            >
              {t('practice-programs-search:filters')}
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
            key={PracticeProgramsSearchConfig.faculties.key}
            name={PracticeProgramsSearchConfig.faculties.key}
            rules={PracticeProgramsSearchConfig.faculties.rules}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <MultiSelect
                  id="programs-search-faculties"
                  value={value}
                  isMulti={true}
                  isClearable={false}
                  placeholder={PracticeProgramsSearchConfig.faculties.placeholder}
                  onChange={onChange}
                  options={faculties.map(mapItemToSelect)}
                />
              );
            }}
          />
          <Controller
            key={PracticeProgramsSearchConfig.start.key}
            name={PracticeProgramsSearchConfig.start.key}
            rules={PracticeProgramsSearchConfig.start.rules}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <DatePicker
                  defaultValue={value ? value : undefined}
                  onChange={onChange}
                  placeholder={PracticeProgramsSearchConfig.start.placeholder}
                />
              );
            }}
          />
          <Controller
            key={PracticeProgramsSearchConfig.end.key}
            name={PracticeProgramsSearchConfig.end.key}
            rules={PracticeProgramsSearchConfig.end.rules}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <DatePicker
                  defaultValue={value ? value : undefined}
                  onChange={onChange}
                  placeholder={PracticeProgramsSearchConfig.end.placeholder}
                />
              );
            }}
          />
          <Controller
            key={PracticeProgramsSearchConfig.workingHours.key}
            name={PracticeProgramsSearchConfig.workingHours.key}
            rules={PracticeProgramsSearchConfig.workingHours.rules}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <MultiSelect
                  id="create-organization-workingHours"
                  value={value}
                  isClearable={false}
                  isMulti={false}
                  onChange={onChange}
                  placeholder={PracticeProgramsSearchConfig.workingHours.config.placeholder}
                  options={PracticeProgramsSearchConfig.workingHours.config.collection}
                />
              );
            }}
          />
          <Controller
            key={PracticeProgramsSearchConfig.domains.key}
            name={PracticeProgramsSearchConfig.domains.key}
            rules={PracticeProgramsSearchConfig.domains.rules}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <MultiSelect
                  id="create-organization-domains"
                  value={value}
                  isClearable={false}
                  isMulti={true}
                  onChange={onChange}
                  placeholder={PracticeProgramsSearchConfig.domains.config.placeholder}
                  options={domains.map(mapItemToSelect)}
                />
              );
            }}
          />
          <button
            id="create-organization-activity__button-back"
            type="button"
            className="text-sm sm:text-base text-yellow bg-black w-full h-full"
            onClick={handleSubmit(search)}
          >
            {t('practice-programs-search:searchWord')}
          </button>
        </div>
      </div>
      {isFilterModalOpen && (
        <PracticeProgramFilterModal
          filters={filters}
          onClose={() => {
            setFilterModalOpen(false);
          }}
          onConfirm={(e: any) => {
            receiveFiltersFromModal(e);
          }}
        />
      )}
    </div>
  );
};

export default PracticeProgramsSearch;
