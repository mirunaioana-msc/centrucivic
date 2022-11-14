import React from 'react';
import { COUNTER_APP } from '../../../../common/constants/CounterApp.constants';
import { COUNTER_TYPE } from '../../../../common/constants/CounterType.constants';
import { useGetLandingCountersQuery } from '../../../../services/statistics/Statistics.queries';
import CounterItem from './CounterItem';

export interface ICounterItem {
  value: number | undefined;
  type: COUNTER_TYPE;
}

const Counter = () => {
  const { data } = useGetLandingCountersQuery(COUNTER_APP.CIVIC_SERVICE);

  return (
    <div className="bg-yellow w-full sm:h-56 h-72 flex sm:flex-row flex-col items-center justify-center lg:gap-x-48 gap-x-28 gap-y-10 px-16">
      <CounterItem value={data?.activeItems} type={COUNTER_TYPE.SERVICES}></CounterItem>
      <CounterItem value={data?.ongsWithApplication} type={COUNTER_TYPE.NGOS}></CounterItem>
    </div>
  );
};

export default Counter;
