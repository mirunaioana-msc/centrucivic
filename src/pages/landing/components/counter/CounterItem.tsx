import React from 'react';
import i18n from '../../../../common/configs/i18n';
import { ICounterItem } from './Counter';

const CounterItem = ({ value, type }: ICounterItem) => {
  const title = i18n.t(`landing:counter:${type}`);
  return (
    <div className="flex flex-col items-center max-w-xs text-center gap-y-4">
      <p className="font-titilliumSemiBold sm:text-6xl lg:text-7xl text-4xl">{value}</p>
      <p className="body-text">{title}</p>
    </div>
  );
};

export default CounterItem;
