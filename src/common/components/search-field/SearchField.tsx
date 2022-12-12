import { SearchIcon } from '@heroicons/react/solid';
import React from 'react';
import { classNames } from '../../helpers/Tailwind.helper';

const SearchField = (props: {
  config: Partial<any>;
  readonly?: boolean;
  disabled?: boolean;
}) => {
  return (
    <div className="relative w-full">
      <div className="relative rounded-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className={classNames(`w-5 h-5`, props.config.defaultValue ? 'text-purple' : ' text-gray-500')} />
        </div>
        <input
          type={props.config.type}
          name={props.config.name}
          onChange={props.config.onChange}
          onBlur={props.config.onBlur}
          className={classNames(
            props.config.error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : '',
            props.config.addOn ? 'pl-10' : 'pl-4',
            'block h-14 w-full  shadow-md sm:text-lg text-gray-500 text-base disabled:bg-gray-100 p-4 font-titillium',
          )}
          placeholder={props.config.placeholder}
          defaultValue={props.config.defaultValue}
          aria-invalid={props.config.error ? 'true' : 'false'}
          disabled={props.disabled}
          id={`${props.config.id}__input`}
        />
      </div>
    </div>
  );
};

export default SearchField;
