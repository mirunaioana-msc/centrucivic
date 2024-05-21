import React from 'react';
import i18n from '../../../../common/configs/i18n';
import { useNomenclature } from '../../../../store/Selectors';
import Domain from './Domain';

const Domains = () => {
  const { domains } = useNomenclature();
  const title = i18n.t('common:domains');

  return (
    <section
      id="domains"
      className="wrapper 2xl:w-[70%] lg:max-w-screen-lg pt-[67px] pb-[113px] sm:gap-10 gap-5"
    >
      <h1 className="title text-center md:text-left">{title}</h1>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-12 lg:gap-y-10 gap-y-5">
        {domains.slice(0, 8).map((domain, index) => (
          <Domain name={domain.name} id={domain.id} key={index}></Domain>
        ))}
        <Domain name={i18n.t('landing:domains.see_all')} id={-1}></Domain>
      </div>
    </section>
  );
};

export default Domains;
