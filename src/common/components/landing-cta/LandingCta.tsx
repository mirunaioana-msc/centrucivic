import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { openInNewTab } from '../../helpers/Format.helper';
import LandingCtaItem from './components/LandingCtaItem';

const LandingCta = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('landing');

  return (
    <div className="sm:pt-20 pt-10 grid md:grid-cols-2 grid-cols-1">
      <LandingCtaItem
        backgroundColor="bg-yellow-500"
        title={t('cta.title_1')}
        description={t('cta.description_1')}
        buttonText={t('cta.register')}
        buttonClasses="yellow-button bg-black text-white my-8 w-2/12"
        onClick={() => openInNewTab(process.env.REACT_APP_CREATE_ONG_PROFILE_LINK!)}
      />
      <LandingCtaItem
        backgroundColor="bg-gray-100"
        title={t('cta.title_2')}
        description={t('cta.description_2')}
        buttonText={t('cta.discover_ongs')}
        buttonClasses="yellow-button my-8 w-2/12"
        onClick={() => navigate('/organizations')}
        anchorLinkText={t('cta.p4g_link')}
      />
    </div>
  );
};

export default LandingCta;
