import React from 'react';
import i18n from '../../../../common/configs/i18n';
import { ICounterItem } from './Counter';
import CountUp from 'react-countup';

const CounterItem = ({ value, type }: ICounterItem) => {
  const title = i18n.t(`landing:counter:${type}`);
  return (
    <div className="flex flex-col items-center max-w-xs text-center gap-y-4">
      {value !== undefined && (
        <CountUp
          className="font-titilliumSemiBold sm:text-6xl lg:text-7xl text-4xl"
          end={value}
          duration={5}
          enableScrollSpy={true} // https://github.com/glennreyes/react-countup/issues/699
        />
      )}
      {value === undefined && (
        <p className="font-titilliumSemiBold sm:text-6xl lg:text-7xl text-4xl">-</p>
      )}
      <p className="body-text">{title}</p>
    </div>
  );
};

export default CounterItem;
