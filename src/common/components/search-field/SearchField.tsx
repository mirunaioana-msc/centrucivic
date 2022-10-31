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
        {props.config.addOn && props.config.addOn()}
        <input
          type={props.config.type}
          name={props.config.name}
          onChange={props.config.onChange}
          onBlur={props.config.onBlur}
          className={classNames(
            props.config.error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : '',
            props.config.addOn ? 'pl-10' : 'pl-4',
            'block h-14 w-full border border-gray-500 shadow-md sm:text-xl text-gray-500 text-base disabled:bg-gray-100 p-4 font-titillium',
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
