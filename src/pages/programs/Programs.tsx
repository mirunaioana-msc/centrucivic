import React from 'react';
import ShapeWrapper from '../../common/components/shape-wrapper/ShapeWrapper';
import { PRACTICE_PROGRAMS } from '../../common/constants/nomenclature.constants';
import ProgramsList from './components/ProgramsList';

const Programs = () => {
  return (
    <ShapeWrapper>
      <ProgramsList
        programs={PRACTICE_PROGRAMS.items}
        total={PRACTICE_PROGRAMS.meta.itemCount}
      ></ProgramsList>
    </ShapeWrapper>
  );
};

export default Programs;
