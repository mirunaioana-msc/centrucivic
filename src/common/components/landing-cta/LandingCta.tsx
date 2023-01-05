import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { openInNewTab } from '../../helpers/Format.helper';
import LandingCtaItem from './components/LandingCtaItem';

const LandingCta = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('landing');

  return (
    <div className="w-full md:right-split-color bottom-split-color">
      <div className="wrapper grid md:grid-cols-2 grid-cols-1 lg:gap-x-56 gap-x-40 gap-y-24">
        <LandingCtaItem
          title={t('cta.title_1')}
          description={t('cta.description_1')}
          buttonText={t('cta.register')}
          buttonClasses="yellow-button bg-black text-white hover:bg-black-800"
          onClick={() => openInNewTab(process.env.REACT_APP_CREATE_ONG_PROFILE_LINK!)}
        />
        <LandingCtaItem
          title={t('cta.title_2')}
          description={t('cta.description_2')}
          buttonText={t('cta.discover_ongs')}
          buttonClasses="yellow-button "
          onClick={() => navigate('/organizations')}
          anchorLinkText={t('cta.p4g_link')}
        />
      </div>
    </div>
  );
};

export default LandingCta;
