import React, { useEffect, useState } from 'react';
import { CalendarIcon } from '@heroicons/react/outline';
import { default as ReactDatePicker } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

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
    if (date) {
      onChange && onChange(date);
    }
  }, [date]);

  return (
    <div className="relative w-full">
      <div className="relative rounded-md">
        <div className="absolute inset-y-0 right-0 pl-3 hidden items-center pointer-events-none z-10 md:flex">
          <CalendarIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <ReactDatePicker
          className="block h-14 w-full p-4 shadow-sm sm:text-xl border border-gray-500 placeholder:text-gray-500"
          selectsRange={false}
          onChange={(update: Date) => {
            setDate(update);
          }}
          selected={date}
          isClearable={false}
          placeholderText={placeholder}
          dateFormat='dd.MM.yyyy'
        />
      </div>
    </div>
  );
};

export default DatePicker;
