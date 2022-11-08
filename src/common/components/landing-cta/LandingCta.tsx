import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
        buttonClasses="yellow-button bg-black text-white my-8"
        onClick={() =>
          window.open(
            process.env.REACT_APP_CREATE_ONG_PROFILE_LINK,
            '_blank',
            'noopener,noreferrer',
          )
        }
      />
      <LandingCtaItem
        backgroundColor="bg-gray-100"
        title={t('cta.title_2')}
        description={t('cta.description_2')}
        buttonText={t('cta.discover_ongs')}
        buttonClasses="yellow-button my-8"
        onClick={() => navigate('/organizations')}
        anchorLinkText={t('cta.p4g_link')}
      />
    </div>
  );
};

export default LandingCta;
