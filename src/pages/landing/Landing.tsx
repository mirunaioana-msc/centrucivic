import React from 'react';
import ServicesSearch from '../../common/components/service-search/ServiceSearch';
import ShapeWrapper from '../../common/components/shape-wrapper/ShapeWrapper';
import { LANDING_DOMAINS } from '../../common/constants/nomenclature.constants';
import Domains from './components/domains/Domains';
import Counter from './components/counter/Counter';
import Description from '../../common/components/description/Description';
import { useTranslation } from 'react-i18next';
import aboutCC from '../../assets/images/landing-about-image.svg';
import { useNavigate } from 'react-router-dom';
import LandingCta from '../../common/components/landing-cta/LandingCta';
import { DONATE_URL } from '../../common/constants/ExternalURL.constants';

const Landing = () => {
  const { t } = useTranslation('landing');
  const navigate = useNavigate();
  return (
    <section className="w-full">
      <div className="bg-yellow w-full">
        <ServicesSearch showFilters={true} onSearchCallback={() => navigate('/services')} />
      </div>
      <div className="max-w-screen-xl mx-auto px-10">
        <Description
          title={t('about.title')}
          content={t('about.paragraph_1')}
          cta={{ label: t('about.action'), link: DONATE_URL }}
          image={aboutCC}
          isTextRight={true}
        ></Description>
      </div>
      <Counter />
      <ShapeWrapper>
        {' '}
        <Domains domains={LANDING_DOMAINS}></Domains>
      </ShapeWrapper>
      <LandingCta />
    </section>
  );
};

export default Landing;
