import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Card from '../../../common/components/card/Card';
import { OrganizationFlat } from '../../../common/interfaces/OrganizationFlat.interface';

const OrganizationItem = ({ organization }: { organization: OrganizationFlat }) => {
  const { t } = useTranslation('organizations');
  const navigate = useNavigate();
  return (
    <Card>
      <div className="flex flex-col sm:gap-y-10 gap-y-5 h-full">
        <div
          style={{ backgroundImage: `url(${organization?.logo})` }}
          className={`aspect-square bg-contain bg-no-repeat bg-center lg:w-32 sm:w-24 w-full lg:min-w-[8rem] sm:min-w-[6rem] sm:max-h-full max-h-[8rem] ${
            organization.logo ? 'bg-transparent' : 'bg-gray-100'
          }`}
        ></div>
        <div className="flex flex-col gap-y-5">
          <p className="subtitle card-title-overflow sm:h-16 h-12">{organization?.name}</p>
          <p className="article card-text-overflow sm:h-28 h-24">{organization?.description}</p>
        </div>
        <button
          aria-label={t('action')}
          className="yellow-button w-full mt-auto"
          onClick={() => navigate(`${organization?.id}`)}
        >
          {t('action')}
        </button>
      </div>
    </Card>
  );
};

export default OrganizationItem;
