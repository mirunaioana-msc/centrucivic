import React, { useState } from 'react';
import { CheckIcon, LocationMarkerIcon, ShareIcon } from '@heroicons/react/solid';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';
import { IService } from '../../interfaces/Service.interface';
import { calculatePeriod, formatAgeCategories, dataToCsv } from '../../helpers/CivicCenter.helper';
import copy from 'copy-to-clipboard';
import { windowOpener } from '../../helpers/Navigation.helper';

interface CivicCenterServiceContentProps {
  service: IService;
}

interface CivicCenterAccessDetailProps {
  title: string;
  description: string;
  containsHtml?: boolean;
}

interface CivicCenterAccessDetailsRowProps {
  label: string;
  value?: string;
}

const CivicCenterAccessDetail = ({
  title,
  description,
  containsHtml,
}: CivicCenterAccessDetailProps) => (
  <div className="pb-4">
    <h4 className="flex items-center  justify-start gap-2">
      <CheckCircleIcon className="w-5 h-5 text-green" />
      <span className="font-titilliumBold text-base text-gray-800">{title}</span>
    </h4>
    {containsHtml ? (
      <div dangerouslySetInnerHTML={{ __html: description || '' }} />
    ) : (
      <p className="font-normal text-sm text-gray-500">{description}</p>
    )}
  </div>
);

const CivicCenterAccessDetailsRow = ({ label, value }: CivicCenterAccessDetailsRowProps) => (
  <div className="flex flex-row items-center justify-start gap-2 text-base">
    <span className="font-titilliumBold text-gray-600">{label}</span>
    <span className="font-titillium">{value}</span>
  </div>
);

const CivicCenterServiceContent = ({ service }: CivicCenterServiceContentProps) => {
  const { t } = useTranslation(['service_details']);
  const [sharedUrl, setSharedUrl] = useState<string>();

  const shareUrl = () => {
    setSharedUrl(window.location.href);
    copy(window.location.href);
  };

  return (
    <section className="divide-y divide-gray-100">
      <div className="flex flex-col gap-2 pb-8">
        <div className="flex justify-between w-full">
          <p className="flex font-titilliumSemiBold text-base items-center gap-2">
            <LocationMarkerIcon className="h-4 w-4" />
            <span>{service.location.name}</span>
          </p>
          <div>
            {sharedUrl ? (
              <div className="text-base flex flex-row items-center">
                <CheckIcon className="w-5 h-5 text-green" />
                <span className="text-gray-900 ml-1">{t('shared', { ns: 'common' })}</span>
              </div>
            ) : (
              <div
                className="text-base flex flex-row items-center cursor-pointer"
                onClick={shareUrl}
              >
                <ShareIcon className="w-5 h-5" />
                <span className="text-gray-900 ml-1">{t('share', { ns: 'common' })}</span>
              </div>
            )}
          </div>
        </div>
        <h3 className="font-titilliumBold text-2xl">{service.name}</h3>
        <div className="flex flex-col gap-4 font-titillium text-base">
          <p className="text-gray-400">{service?.shortDescription}</p>
          <p className="text-gray-400">{service?.longDescription}</p>
        </div>
        <div className="flex flex-col gap-2 md:gap-4 md:flex-row md:flex-wrap">
          <CivicCenterAccessDetailsRow
            label={t('details.available')}
            value={calculatePeriod(service)}
          />
          <CivicCenterAccessDetailsRow
            label={t('details.age_category')}
            value={formatAgeCategories(service)}
          />
          <CivicCenterAccessDetailsRow
            label={t('details.domains')}
            value={dataToCsv(service.domains)}
          />
        </div>
      </div>
      <div></div>
      <div className="flex flex-col xl:justify-between divide-y divide-gray-100 xl:divide-none gap-4 py-8 xl:flex-row">
        {service?.hasOnlineAccess && (
          <div className="flex-1 flex flex-col gap-2 xl:max-w-[30%] py-2 xl:py-0">
            <CivicCenterAccessDetail
              title={t('details.access.online.title')}
              description={service.onlineAccessDescription}
            />
            <div className="flex gap-4 py-6">
              <button
                className="yellow-button text-base"
                onClick={() => windowOpener(service.onlineAccessLink)}
              >
                {t('actions.open')}
              </button>
            </div>
          </div>
        )}
        {service?.hasEmailPhoneAccess && (
          <div className="flex-1 flex flex-col gap-2 xl:max-w-[30%] py-2 xl:py-0">
            <CivicCenterAccessDetail
              title={t('details.access.email_or_phone.title')}
              description={service.emailPhoneAccessDescription}
            />
            <CivicCenterAccessDetailsRow label={t('details.email')} value={service.emailAccess} />
            <CivicCenterAccessDetailsRow label={t('details.phone')} value={service.phoneAccess} />
          </div>
        )}
        {service?.hasPhysicalAccess && (
          <div className="flex-1 flex flex-col gap-2 xl:max-w-[30%] py-2 xl:py-0">
            <CivicCenterAccessDetail
              title={t('details.access.physical.title')}
              description={service?.physicalAccessDescription || ''}
              containsHtml
            />
            <CivicCenterAccessDetailsRow
              label={t('details.address')}
              value={service.physicalAccessAddress}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CivicCenterServiceContent;
