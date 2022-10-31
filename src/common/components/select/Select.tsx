/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import Select from 'react-select';
import './Select.css';


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
}

const MultiValue = ({ getValue, index }: any) =>
  !index ? <p>{getValue().length} {t('practice-programs-search:selected')}</p> : <p></p>;

const MultiSelect = ({
  placeholder,
  isClearable,
  onChange,
  value,
  options,
  id,
  isMulti
}: MultiSelectConfig) => {
  const [defaultValue, setDefaultValue] = useState<any[]>([]);

  useEffect(() => { setDefaultValue(value) }, [value])

  const components = { MultiValue };
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
