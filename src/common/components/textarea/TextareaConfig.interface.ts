/* eslint-disable @typescript-eslint/ban-types */

import { ChangeEventHandler } from 'react';

export interface TextAreaConfig {
  label?: string;
  name?: string;
  placeholder?: string;
  helperText?: string;
  defaultValue?: string;
  error?: string | any;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  id?: string;
}
