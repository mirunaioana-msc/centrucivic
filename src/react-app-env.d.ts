/// <reference types="react-scripts" />

import { GroupBase } from 'react-select';

declare module 'react-select/dist/declarations/src/Select' {
  export interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    icon: any;
  }
}
