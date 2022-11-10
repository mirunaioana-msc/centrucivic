import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../../common/components/card/Card';
import { Organization } from '../../../common/interfaces/Organization.interface';

const OrganizationItem = ({ organization }: { organization: Organization }) => {
  const { t } = useTranslation('organizations');
  return (
    <Card>
      <div className="flex flex-col sm:gap-y-10 gap-y-5 h-full">
        <div className="aspect-square lg:w-32 sm:w-24 w-full lg:min-w-[8rem] sm:min-w-[6rem] bg-gray-150 sm:max-h-full max-h-[8rem]">
          {organization.logo && (
            <img
              className="bg-cover h-full w-full"
              alt="organization image"
              src={organization.logo}
            ></img>
          )}
        </div>
        <div className="flex flex-col gap-y-5">
          <p className="subtitle">{organization.name}</p>
          <p className="article card-text-overflow">{organization.shortDescription}</p>
        </div>
        <button
          className="yellow-button w-full mt-auto"
          onClick={() => console.log('Not yet implemented')}
        >
          {t('action')}
        </button>
      </div>
    </Card>
  );
};

export default OrganizationItem;
