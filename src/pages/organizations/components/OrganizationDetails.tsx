import React from 'react';
import { HomeIcon, MailIcon, PhoneIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';
import Card from '../../../common/components/card/Card';
import { Organization } from '../../../common/interfaces/Organization.interface';
import facebook_icon from '../../../assets/icons/facebook.svg';
import instagram_icon from '../../../assets/icons/instagram.svg';
import twitter_icon from '../../../assets/icons/twitter.svg';
import { openInNewTab } from '../../../common/helpers/Format.helper';

interface OrganizationProps {
  organization: Organization;
}

const OrganizationDetails = ({ organization }: OrganizationProps) => {
  const { t } = useTranslation('organization_details');

  return (
    <Card>
      <div className="flex lg:flex-row flex-col gap-x-20 gap-y-10">
        <div className="aspect-square lg:w-72 lg:h-72 bg-gray-100 sm:h-44 sm:w-44 w-full h-32">
          {organization.logo && (
            <img
              alt="Organization logo"
              className="w-full h-full bg-cover"
              src={organization.logo}
            ></img>
          )}
        </div>
        <div className="flex flex-col gap-y-5">
          <p className="subtitle">{organization.name}</p>
          <p className="article">{organization.shortDescription}</p>
          <p className="article">{organization.description}</p>
          <div className="flex sm:flex-row flex-col gap-x-2 body-text">
            <p className="text-purple font-titilliumSemiBold">{t('activity_domains')}</p>
            <p>{organization.domains?.map((domain) => domain.name).join(', ')}</p>
          </div>
          <div className="flex sm:flex-row flex-col gap-x-10 gap-y-5 body-text">
            <div className="flex flex-col lg:gap-y-2 gap-y-1 flex-1">
              <p className="text-purple font-titilliumSemiBold">{t('contact')}</p>
              <div className="flex gap-x-2">
                <PhoneIcon className="w-4"></PhoneIcon>
                <p>{organization.contact.phone || '-'}</p>
              </div>
              <div className="flex gap-x-2">
                <MailIcon className="w-4"></MailIcon>
                <p>{organization.contact.email || '-'}</p>
              </div>
              <div className="flex gap-x-2">
                <HomeIcon className="w-4"></HomeIcon>
                <p>{[organization.city, organization.county].join(', ') || '-'}</p>
              </div>
            </div>
            <div className="flex flex-col lg:gap-y-2 gap-y-1 flex-1">
              <p className="text-purple font-titilliumSemiBold">{t('social_media')}</p>
              <div className="flex flex-row gap-x-5">
                {organization.facebook && (
                  <img
                    className="lg:w-6 w-4 hover:cursor-pointer"
                    alt="Facebook icon"
                    src={facebook_icon}
                    onClick={() => {
                      if (organization.facebook) openInNewTab(organization.facebook);
                    }}
                  ></img>
                )}
                {organization.instagram && (
                  <img
                    className="lg:w-6 w-4 hover:cursor-pointer"
                    alt="Instagram icon"
                    src={instagram_icon}
                    onClick={() => {
                      if (organization.instagram) openInNewTab(organization.instagram);
                    }}
                  ></img>
                )}
                {organization.twitter && (
                  <img
                    className="lg:w-6 w-4 hover:cursor-pointer"
                    alt="Twitter icon"
                    src={twitter_icon}
                    onClick={() => {
                      if (organization.twitter) openInNewTab(organization.twitter);
                    }}
                  ></img>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrganizationDetails;
