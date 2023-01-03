import React from 'react';
import Select, { components } from 'react-select';
import './Select.css';
import { classNames } from '../../helpers/Tailwind.helper';
import i18n from 'i18next';
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
        {props.selectProps.icon && (
          <props.selectProps.icon
            className={classNames(`ml-1 w-5 h-5`, props.hasValue ? 'text-purple' : 'text-gray-500')}
          />
        )}
        {children}
      </components.Control>
    )
  );
};

const MultiValue = ({ getValue, index, ...rest }: any) => {
  if (rest.selectProps.menuIsOpen && index == 0) {
    return <p>({getValue().length})&nbsp;</p>;
  } else {
    return index == 0 ? (
      <p className="text-lg truncate">
        {getValue().length} {t('common:selected')}
      </p>
    ) : (
      <></>
    );
  }
};

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
  return (
    <div className="w-full">
      <Select
        placeholder={placeholder}
        classNamePrefix="reactselect"
        onChange={onChange}
        isClearable={isClearable}
        isMulti={isMulti}
        value={value}
        hideSelectedOptions={false}
        options={options}
        closeMenuOnSelect={false}
        closeMenuOnScroll={true}
        id={id}
        isSearchable={true}
        icon={icon}
        components={{
          Control,
          MultiValue,
          DropdownIndicator: null,
        }}
      />
    </div>
  );
};

export default MultiSelect;
