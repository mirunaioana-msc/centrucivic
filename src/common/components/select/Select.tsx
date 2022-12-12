/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import Select, { components } from 'react-select';
import './Select.css';
import { classNames } from '../../helpers/Tailwind.helper';

export interface MultiSelectConfig {
  label?: string;
  helperText?: string;
  error?: string;
  placeholder?: string;
  isClearable?: boolean;
  value: any[];
  onChange: any;
  options: any[];
  id?: string;
  isMulti: boolean;
  icon?: any;
}

const Control = ({ children, ...props }: any) => {
  return (
    components.Control && (
      <components.Control {...props}>
        {props.icon && (
          <props.icon className={classNames(`ml-1 w-5 h-5`, props.hasValue ? 'text-purple' : 'text-gray-500')} />
        )}
        {children}
      </components.Control>
    )
  );
};

const MultiValue = ({ getValue, index }: any) =>
  !index ? <p className='text-lg '>{getValue().length} {t('service_search:selected')}</p> : <p></p>;

const MultiSelect = ({
  placeholder,
  isClearable,
  onChange,
  value,
  options,
  id,
  isMulti,
  icon,
}: MultiSelectConfig) => {
  const [defaultValue, setDefaultValue] = useState<any[]>([]);

  useEffect(() => { setDefaultValue(value) }, [value])

  const components = { MultiValue, Control: (e: any) => Control({ ...e, icon }), DropdownIndicator: null };
  return (
    <div className='w-full'>
      <Select
        placeholder={placeholder}
        classNamePrefix="reactselect"
        onChange={onChange}
        isClearable={isClearable}
        isMulti={isMulti}
        value={defaultValue}
        hideSelectedOptions={false}
        options={options}
        id={id}
        components={components}
      />
    </div>
  );
};

export default MultiSelect;
