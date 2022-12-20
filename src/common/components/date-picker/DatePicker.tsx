import React, { useEffect, useState } from 'react';
import { CalendarIcon } from '@heroicons/react/outline';
import { default as ReactDatePicker } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { classNames } from '../../helpers/Tailwind.helper';

interface DateRangePickerProps {
  defaultValue?: any;
  placeholder?: string;
  onChange?: (range: any) => void;
}

const DatePicker = ({ defaultValue, onChange, placeholder }: DateRangePickerProps) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (defaultValue) {
      setDate(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    onChange && onChange(date);
  }, [date]);

  return (
    <div className="relative w-full">
      <div className="relative rounded-md">
        <div className="flex absolute inset-y-0 left-0 pl-3 items-center pointer-events-none z-10">
          <CalendarIcon
            className={classNames(
              `-ml-1 mr-2 h-5 w-5`,
              defaultValue ? 'text-purple' : 'text-gray-500',
            )}
            aria-hidden="true"
          />
        </div>
        <ReactDatePicker
          className="block h-14 w-full p-4 pl-8 shadow-md sm:text-lg placeholder:text-gray-500"
          selectsRange={false}
          onChange={(update: Date) => {
            setDate(update);
          }}
          selected={date}
          isClearable
          placeholderText={placeholder}
          clearButtonClassName="range-clear-button"
          dateFormat="dd.MM.yyyy"
        />
      </div>
    </div>
  );
};

export default DatePicker;
