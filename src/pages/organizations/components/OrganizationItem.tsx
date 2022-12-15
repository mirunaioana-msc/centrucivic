import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Card from '../../../common/components/card/Card';
import { OrganizationFlat } from '../../../common/interfaces/OrganizationFlat.interface';

const OrganizationItem = ({ organization }: { organization: OrganizationFlat }) => {
  const { t } = useTranslation('organizations');
  const navigate = useNavigate();
  return (
    <div className="mt-10">
      <Card>
        <div className="flex flex-col sm:gap-y-10 gap-y-5 h-full">
          <div className="aspect-square lg:w-32 sm:w-24 w-full lg:min-w-[8rem] sm:min-w-[6rem] bg-gray-100 sm:max-h-full max-h-[8rem]">
            {organization?.logo && (
              <img
                className="bg-cover h-full w-full"
                alt="organization image"
                src={organization?.logo}
              ></img>
            )}
          </div>
          <div className="flex flex-col gap-y-5">
            <p className="subtitle">{organization.name}</p>
            <p className="article card-text-overflow">{organization.description}</p>
          </div>
          <button
            className="yellow-button w-full mt-auto"
            onClick={() => navigate(`${organization.id}`)}
          >
            {t('action')}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default OrganizationItem;
