import React from 'react';
import ccLogo from '../../assets/images/cc-big-logo.svg';
import { useTranslation } from 'react-i18next';
import Description from '../../common/components/description/Description';
import ongHubLogo from '../../assets/images/onghub-logo.svg';

const About = () => {
  const { t } = useTranslation('about');
  return (
    <div className="wrapper grid gap-y-16">
      <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-x-32 gap-x-12 lg:gap-y-10 gap-y-5">
        <div className="md:order-1 order-2 sm:gap-10 gap-5">
          <p className="title sm:mb-5 text-center md:text-left">{t('civic_center.title')}</p>
          <p className="body-text w-full">{t('civic_center.paragraph_1')}</p>
        </div>
        <img
          src={ccLogo}
          alt="Civic Center - logo"
          className="mx-auto md:order-2 order-1 md:h-auto h-16"
        />
        <p className="order-3 body-text w-full">{t('civic_center.paragraph_2')}</p>
        <p className="order-4 body-text w-full">{t('civic_center.paragraph_3')}</p>
      </div>
      <div className="bg-gray-400 h-[1px] w-full"></div>
      <Description
        title={t('ong_hub.title')}
        content={t('ong_hub.paragraph_1')}
        cta={{ label: t('ong_hub.action'), link: process.env.REACT_APP_CREATE_ONG_PROFILE_LINK }}
        image={ongHubLogo}
      ></Description>
    </div>
  );
};

export default About;
