import React from 'react';
import { useTranslation } from 'react-i18next';
import { IService } from '../../../common/interfaces/Service.interface';
import ProgramItem from './ServiceItem';

interface ServicesListProps {
  services: IService[];
  total: number;
}

const ServicesList = ({ services, total }: ServicesListProps) => {
  const { t } = useTranslation('practice_programs');
  return (
    <div className="flex flex-col w-full lg:px-60 px-10 lg:py-20 py-10">
      <p className="title text-center">{`${total} ${total > 1 ? t('many_programs_title') : t('one_program_title')
        }`}</p>
      <div className="flex flex-col w-full gap-y-10">
        {services.map((service: IService, index) => (
          <ProgramItem key={index} program={service}></ProgramItem>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
