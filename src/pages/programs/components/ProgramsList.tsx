import React from 'react';
import { useTranslation } from 'react-i18next';
import { IPracticeProgram } from '../../../common/interfaces/PracticeProgram.interface';
import ProgramItem from './ProgramItem';

interface ProgramsListProps {
  programs: IPracticeProgram[];
  total: number;
}

const ProgramsList = ({ programs, total }: ProgramsListProps) => {
  const { t } = useTranslation('practice_programs');
  return (
    <div className="flex flex-col w-full lg:px-60 px-10 lg:py-20 py-10">
      <p className="title text-center">{`${total} ${
        total > 1 ? t('many_programs_title') : t('one_program_title')
      }`}</p>
      <div className="flex flex-col w-full gap-y-10">
        {programs.map((program: IPracticeProgram, index) => (
          <ProgramItem key={index} program={program}></ProgramItem>
        ))}
      </div>
    </div>
  );
};

export default ProgramsList;
