import React from 'react';
import { CalendarIcon, ClockIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';
import Card from '../../../common/components/card/Card';
import { formatDate, formatDateYear } from '../../../common/helpers/Format.helper';
import { IService } from '../../../common/interfaces/Service.interface';
import p4g_logo from '../../../assets/images/logo.svg';

const ProgramItem = ({ program }: { program: IService }) => {
  const { t } = useTranslation('practice_programs');
  return (
    <Card>
      <div className="flex sm:flex-row flex-col w-full lg:min-h-32 min-h-[6rem] items-center gap-x-8 gap-y-5 h-full">
        <div className="aspect-square lg:w-32 sm:w-24 w-full lg:min-w-[8rem] sm:min-w-[6rem] bg-gray-150 sm:max-h-full max-h-[8rem]">
          {p4g_logo && (
            <img
              alt="practice program image"
              className="w-full h-full bg-cover"
              src={p4g_logo}
            ></img>
          )}
        </div>
        <div className="flex flex-col sm:h-full gap-y-3 flex-wrap">
          <a
            className="sm:mb-auto max-w-fit sm:text-sm lg:text-base text-xs"
            href={`/organization/${program.organization?.id}`}
          >
            {program.organization?.organizationGeneral?.name}
          </a>
          <p className="subtitle">{program.name}</p>
          <div className="flex sm:flex-row flex-wrap gap-x-8 gap-y-2 sm:mt-auto">
            <div className="flex flex-row items-center gap-x-1">
              <LocationMarkerIcon className="w-4"></LocationMarkerIcon>
              <p className="sm:text-sm lg:text-base text-xs">{program.location.name}</p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <CalendarIcon className="w-4"></CalendarIcon>
              <p className="sm:text-sm lg:text-base text-xs">
                {formatDate(program.startDate)} - {formatDate(program.endDate)}
              </p>
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <ClockIcon className="w-4"></ClockIcon>
              {/* <p className="sm:text-sm lg:text-base text-xs">{`min. ${program.minWorkingHours}`}</p> */}
            </div>
          </div>
        </div>
        <div className="ml-auto flex flex-col justify-center sm:h-full h-fit items-end gap-y-4">
          <button
            type="button"
            className="font-titilliumSemiBold yellow-button text-center h-fit lg:w-48 w-32 lg:text-base text-xs"
            onClick={() => console.log('Not yet implemented')}
          >
            {`${t('action')}`}
          </button>
          {/* {program.deadline && ( */}
          {/* <p className="mt-auto text-right sm:text-sm lg:text-base text-xs"> */}
          {/* {`${t('deadline')} ${formatDateYear(program.deadline)}`} */}
          {/* </p> */}
          {/* )}s */}
        </div>
      </div>
    </Card>
  );
};

export default ProgramItem;
