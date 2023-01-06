import React from 'react';
import { CheckCircleIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';
import Card from '../../../common/components/card/Card';
import p4g_logo from '../../../assets/images/logo.svg';
import { formatDateDot } from '../../../common/helpers/Format.helper';
import { IService } from '../../../common/interfaces/Service.interface';

interface ServiceItemProps {
  service: IService;
  onNavigate: () => void;
}

const ServiceItem = ({ service, onNavigate }: ServiceItemProps) => {
  const { t } = useTranslation(['services', 'common']);
  return (
    <Card>
      <div className="flex flex-col gap-y-2 h-full">
        <div
          style={{ backgroundImage: `url(${service?.logo})` }}
          className={`aspect-square bg-contain bg-no-repeat bg-center lg:w-32 sm:w-24 w-full lg:min-w-[8rem] sm:min-w-[6rem] sm:max-h-full max-h-[8rem] ${
            service.logo ? 'bg-transparent' : 'bg-gray-100'
          }`}
        ></div>
        <div className="flex flex-row items-center gap-x-1">
          <LocationMarkerIcon className="w-4"></LocationMarkerIcon>
          <p className="sm:text-sm lg:text-base text-xs">{service.location.name}</p>
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="subtitle card-title-overflow sm:h-16 h-12">{service.name}</p>
          <p className="article card-text-overflow sm:h-28 h-24">{service.shortDescription}</p>
        </div>
        <div className="flex pt-2 sm:h-16 h-8">
          <p>
            <span>{t('available', { ns: 'common' })}</span>&nbsp;
            <span>{formatDateDot(service.startDate)}</span> -{' '}
            <span>{service.endDate ? formatDateDot(service.endDate) : t('card.present')}</span>
          </p>
        </div>
        <div className="mt-4">
          <p className="font-titilliumBold text-gray-600">{t('card.access')}</p>
          <div className="flex xl:gap-2 gap-1 py-4 flex-wrap md:h-24">
            {service.hasOnlineAccess && (
              <div className="flex gap-2 items-center">
                <CheckCircleIcon className="w-5 h-5 text-green" />
                <span className="text-sm">{t('card.online')}</span>
              </div>
            )}
            {service.hasEmailPhoneAccess && (
              <div className="flex gap-2 items-center">
                <CheckCircleIcon className="w-5 h-5 text-green" />
                <span className="text-sm">{t('card.email')}</span>
              </div>
            )}
            {service.hasPhysicalAccess && (
              <div className="flex gap-2 items-center">
                <CheckCircleIcon className="w-5 h-5 text-green" />
                <span className="text-sm">{t('card.location')}</span>
              </div>
            )}
          </div>
        </div>
        <button className="yellow-button w-full mt-auto" onClick={onNavigate}>
          {t('card.details')}
        </button>
      </div>
    </Card>
  );
};

export default ServiceItem;
