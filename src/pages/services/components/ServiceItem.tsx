import React from 'react';
import { CalendarIcon, CheckCircleIcon, ClockIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';
import Card from '../../../common/components/card/Card';
import { formatDateDot } from '../../../common/helpers/Format.helper';
import { IService } from '../../../common/interfaces/Service.interface';
import p4g_logo from '../../../assets/images/logo.svg';

const ServiceItem = ({ service }: { service: IService }) => {
  const { t } = useTranslation('service_card');
  return (
    <Card>
      <div className="flex flex-col gap-y-2 h-full">
        <div className="aspect-square lg:w-32 sm:w-24 w-full lg:min-w-[8rem] sm:min-w-[6rem] bg-gray-150 sm:max-h-full max-h-[8rem]">
          {p4g_logo && (
            <img
              className="bg-cover h-full w-full"
              alt="service image"
              src={p4g_logo}
            ></img>
          )}
        </div>
        <div className="flex flex-row items-center gap-x-1">
          <LocationMarkerIcon className="w-4"></LocationMarkerIcon>
          <p className="sm:text-sm lg:text-base text-xs">{service.location.name}</p>
        </div>
        <div className="flex flex-col gap-y-5">
          <p className="subtitle">{service.name}</p>
          <p className="article card-text-overflow">{service.shortDescription}</p>
        </div>

        <div className='flex pt-2'>
          <p><span>{t('available')}</span>&nbsp;<span>{formatDateDot(service.startDate)}</span> - <span>{formatDateDot(service.endDate)}</span></p>
        </div>
        <div className='mt-24'>
          <p className='font-titilliumBold text-gray-600'>{t('access')}</p>
          <div className='flex gap-4 py-4'>
            {service.hasOnlineAccess && <div className='flex gap-2 items-center'><CheckCircleIcon className='w-5 h-5 text-green' /><span className='text-sm'>{t('online')}</span></div>}
            {service.hasEmailPhoneAccess && <div className='flex gap-2 items-center'><CheckCircleIcon className='w-5 h-5 text-green' /><span className='text-sm'>{t('email')}</span></div>}
            {service.hasPhysicalAccess && <div className='flex gap-2 items-center'><CheckCircleIcon className='w-5 h-5 text-green' /><span className='text-sm'>{t('location')}</span></div>}
          </div>
        </div>
        <button
          className="yellow-button w-full mt-auto"
          onClick={() => console.log('Not yet implemented')}
        >
          {t('details')}
        </button>
      </div>
    </Card>
  );
};

export default ServiceItem;