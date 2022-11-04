import React from 'react';
import FeedbackForm from '../../common/components/feedback-form/FeedbackForm';
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
      <FeedbackForm />
    </ShapeWrapper>
  );
};

export default Programs;
