import React from 'react';
import ServiceSearch from '../../common/components/service-search/ServiceSearch';
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

  const onGoToServices = (search: string) => {
    navigate({
      pathname: '/services',
      search,
    });
  };

  return (
    <section className="w-full">
      <ServiceSearch onSearchCallback={onGoToServices} />
      <Description
        title={t('about.title')}
        content={t('about.paragraph_1')}
        cta={{ label: t('about.action'), link: DONATE_URL }}
        image={aboutCC}
        isTextRight={true}
        className="wrapper"
      ></Description>
      <Counter />
      <Domains />
      <LandingCta />
    </section>
  );
};

export default Landing;
