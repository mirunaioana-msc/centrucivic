import React from 'react';
import ShapeWrapper from '../../common/components/shape-wrapper/ShapeWrapper';
import { PRACTICE_PROGRAMS } from '../../common/constants/nomenclature.constants';
import ServicesList from './components/ServiceList';

const Programs = () => {
  return (
    <ShapeWrapper>
      <ServicesList
        services={[]}
        total={PRACTICE_PROGRAMS.meta.itemCount}
      ></ServicesList>
    </ShapeWrapper>
  );
};

export default Programs;
