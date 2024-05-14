import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import logo from './../../../assets/images/logo.svg';
import { XIcon } from '@heroicons/react/solid';
import { Controller } from 'react-hook-form';
import ServerSelect from '../server-select/ServerSelect';
import { mapItemToSelect } from '../../helpers/Nomenclature.helper';
import { useNomenclature } from '../../../store/nomenclatures/Nomenclatures.selectors';
import MultiSelect from '../select/Select';
import { useTranslation } from 'react-i18next';
import { ServiceSearchConfig } from '../service-search/configs/ServiceSearch.config';
import { getCities } from '../../../services/nomenclature/Nomenclature.service';
import { mapCitiesToSelect } from '../../helpers/Format.helper';

interface PracticeProgramFilterModalProps {
  onClose: () => void;
  form: any;
  onSubmit: (data: any) => void;
}

const NGOFilterModal = ({ onClose, onSubmit, form }: PracticeProgramFilterModalProps) => {
  const { t } = useTranslation();
  const { domains } = useNomenclature();

  const { handleSubmit, control, reset } = form;

  const loadOptionsLocationSearch = async (searchWord: string) => {
    return getCities({ search: searchWord }).then((cities) => cities.map(mapCitiesToSelect));
  };

  const onApply = (data: any) => {
    onSubmit(data);
    onClose();
  };

  const onReset = () => {
    reset({});
    handleSubmit(onApply)();
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
              <Dialog.Panel className="bg-white p-4 text-left shadow-xl transform transition-all min-h-full h-fit w-full flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <img
                    height={'40px'}
                    width={'67px'}
                    src={logo}
                    alt="Code 4 Romania - NGO Hub"
                    className="h-16"
                  />
                  <button aria-label={t('common:close')} onClick={onClose}>
                    <XIcon className="w-7 h-7" />
                  </button>
                </div>
                <div className="h-1 bg-gray-200"></div>
                <div className="flex flex-col w-full justify-between">
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
                            isClearable
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
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full mt-auto">
                  <button
                    aria-label={t('filter_modal:apply')}
                    type="button"
                    className="flex bg-yellow w-full rounded font-titilliumSemiBold text-xl items-center justify-center p-3"
                    onClick={handleSubmit(onApply)}
                  >
                    {t('filter_modal:apply')}
                  </button>
                  <button
                    aria-label={t('filter_modal:reset')}
                    type="button"
                    className="flex bg-gray-100 w-full rounded font-titilliumSemiBold text-xl items-center justify-center p-3"
                    onClick={onReset}
                  >
                    {t('filter_modal:reset')}
                  </button>
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
