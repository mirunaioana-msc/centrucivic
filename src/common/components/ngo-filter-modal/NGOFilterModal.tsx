import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import logo from './../../../assets/images/logo.svg';
import { XIcon } from '@heroicons/react/solid';
import { Controller } from 'react-hook-form';
import ServerSelect from '../server-select/ServerSelect';
import { mapItemToSelect } from '../../helpers/Nomenclature.helper';
import { useNomenclature } from '../../../store/nomenclatures/Nomenclatures.selectors';
import { useCitiesQuery } from '../../../services/nomenclature/Nomeclature.queries';
import MultiSelect from '../select/Select';
import { useTranslation } from 'react-i18next';
import { ServiceSearchConfig } from '../service-search/configs/ServiceSearch.config';

interface PracticeProgramFilterModalProps {
  onClose: () => void;
  form: any;
  onSubmit: (data: any) => void;
}

const NGOFilterModal = ({ onClose, onSubmit, form }: PracticeProgramFilterModalProps) => {
  const { t } = useTranslation();
  const [searchLocationTerm, seSearchtLocationTerm] = useState('');
  const { cities, domains } = useNomenclature();

  useCitiesQuery(searchLocationTerm);

  const { handleSubmit, control } = form;

  const loadOptionsLocationSearch = async (searchWord: string) => {
    seSearchtLocationTerm(searchWord);
    return cities.map(mapItemToSelect);
  };

  const onApply = (data: any) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto h-full">
          <div className="flex justify-center h-full text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all h-full w-full">
                <div className="relative w-full h-full">
                  <div className="flex justify-between items-center">
                    <img src={logo} alt="Code 4 Romania - ONG Hub" className="h-16" />
                    <button onClick={onClose}>
                      <XIcon className="w-7 h-7" />
                    </button>
                  </div>
                  <div className="h-1 bg-gray-200 my-8"></div>
                  <div className="flex  flex-col w-full justify-between">
                    <div className="flex flex-col w-full gap-4">
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
                      <Controller
                        key={ServiceSearchConfig.domains.key}
                        name={ServiceSearchConfig.domains.key}
                        rules={ServiceSearchConfig.domains.rules}
                        control={control}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <MultiSelect
                              id="create-organization-domains"
                              value={value}
                              isClearable={false}
                              isMulti={true}
                              onChange={onChange}
                              placeholder={ServiceSearchConfig.domains.config.placeholder}
                              options={domains.map(mapItemToSelect)}
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full absolute bottom-4">
                      <button
                        type="button"
                        className="flex bg-yellow w-full rounded font-titilliumSemiBold text-xl items-center justify-center p-3"
                        onClick={handleSubmit(onApply)}
                      >
                        {t('filterModal:apply')}
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NGOFilterModal;
