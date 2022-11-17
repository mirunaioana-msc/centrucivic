/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import debounce from 'debounce-promise'
import './ServerSelect.css';
import { LocationMarkerIcon } from '@heroicons/react/outline';
import { classNames } from '../../helpers/Tailwind.helper';

export interface ServerSelectConfig {
  label?: string;
  isMulti: boolean;
  helperText?: string;
  error?: string;
  placeholder?: string;
  isClearable?: boolean;
  value: any[];
  onChange: any;
  loadOptions: any;
  id?: string;
  addOn?: any;
}

const Control = ({ children, ...props }: any) => {
  return (
    components.Control && (
      <components.Control {...props}>
        {(
          <LocationMarkerIcon className={classNames(`w-5 h-5`, props.hasValue ? 'text-purple' : 'text-gray-500')} />
        )}
        {children}
      </components.Control>
    )
  );
};

const ServerSelect = ({
  placeholder,
  isClearable,
  isMulti,
  onChange,
  value,
  loadOptions,
  id,
  addOn,
}: ServerSelectConfig) => {

  const [defaultValue, setDefaultValue] = useState<any>();

  const debouncedLoadOptions = debounce(loadOptions, 500, {
    leading: false,
  });

  useEffect(() => {
    setDefaultValue(value);
  }, [value])

  return (
    <div className='w-full'>
      <AsyncSelect
        id={`${id}__input`}
        cacheOptions
        placeholder={placeholder}
        classNamePrefix="reactserverselect"
        loadOptions={debouncedLoadOptions}
        onChange={onChange}
        hideSelectedOptions={false}
        isClearable={isClearable}
        isMulti={isMulti}
        value={defaultValue}
        components={{ DropdownIndicator: null, Control }}
      />
    </div>
  );
};

export default ServerSelect;
