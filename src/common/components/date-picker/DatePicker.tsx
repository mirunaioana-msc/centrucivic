import React, { useEffect, useState } from 'react';
import { CalendarIcon } from '@heroicons/react/outline';
import { default as ReactDatePicker } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';
import { classNames } from '../../helpers/Tailwind.helper';

interface DateRangePickerProps {
  defaultValue?: any;
  placeholder?: string;
  onChange?: (range: any) => void;
}

const DatePicker = ({ defaultValue, onChange, placeholder }: DateRangePickerProps) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (defaultValue || defaultValue === null) {
      setDate(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    onChange && onChange(date);
  }, [date]);

  // eslint-disable-next-line react/display-name
  const CustomInput = React.forwardRef((props: any, ref: any) => {
    return (
      <div className="flex h-14 w-full shadow-md sm:text-lg text-base disabled:bg-gray-100 font-titillium">
        <div className="flex absolute inset-y-0 left-0 pl-4 items-center pointer-events-none">
          <CalendarIcon
            className={classNames(
              `-ml-1 mr-2 h-5 w-5`,
              defaultValue ? 'text-purple' : 'text-gray-500',
            )}
            aria-hidden="true"
          />
        </div>
        <input
          onClick={props.onClick}
          ref={ref}
          onChange={props.onChange}
          className="block h-full w-full pl-10 truncate outline-none focus:shadow-input font-titillium"
          placeholder={props.placeholder}
          defaultValue={props.value}
          maxLength={100}
        />
      </div>
    );
  });

  return (
    <div className="relative w-full">
      <div className="relative rounded-md">
        <ReactDatePicker
          selectsRange={false}
          onChange={(update: Date) => {
            setDate(update);
          }}
          selected={date}
          isClearable
          placeholderText={placeholder}
          clearButtonClassName="datepicker-clear-button"
          dateFormat="dd.MM.yyyy"
          customInput={<CustomInput />}
        />
      </div>
    </div>
  );
};

export default DatePicker;
