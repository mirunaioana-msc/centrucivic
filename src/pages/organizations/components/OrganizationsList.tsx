import React from 'react';
import { useTranslation } from 'react-i18next';
import { Organization } from '../../../common/interfaces/Organization.interface';
import OrganizationItem from './OrganizationItem';

interface OrganizationsProps {
  organizations: Organization[];
  total: number;
}

const OrganizationsList = ({ organizations, total }: OrganizationsProps) => {
  const { t } = useTranslation('organizations');
  return (
    <div className="w-full xl:px-60 px-10 lg:py-20 py-10">
      <p className="title text-center ">{`${total} ${
        total > 1 ? t('many_organizations_title') : t('one_organization_title')
      }`}</p>
      <div className="grid text-left grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-y-10 gap-x-10">
        {organizations.map((ong: Organization, index) => (
          <OrganizationItem key={index} organization={ong}></OrganizationItem>
        ))}
      </div>
    </div>
  );
};

export default OrganizationsList;
