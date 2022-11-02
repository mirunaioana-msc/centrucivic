/* eslint-disable @typescript-eslint/ban-types */

import { ChangeEventHandler } from 'react';

export interface ContactInputFieldConfig {
  type: 'text' | 'password' | 'number' | 'tel' | 'checkbox' | undefined;
  label?: string;
  name?: string;
  placeholder?: string;
  helperText?: string;
  defaultValue?: string;
  error?: string | any;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  addOn?: Function;
  id?: string;
}
