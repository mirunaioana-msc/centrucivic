import React, { useMemo } from 'react';
import i18n from '../../../../common/configs/i18n';
import Domain from './Domain';
import { useServiceDomainsQuery } from '../../../../services/nomenclature/Nomeclature.queries';

const Domains = () => {
  const { data: domains } = useServiceDomainsQuery();
  const title = i18n.t('common:domains');

  const domainGroups = useMemo(() => {
    const groups = domains?.map((domain: any) => domain.group);
    return Array.from(new Set(groups)) as string[];
  }, [domains]);

  return (
    <section
      id="domains"
      className="wrapper 2xl:w-[70%] lg:max-w-screen-lg pt-[67px] pb-[113px] sm:gap-10 gap-5"
    >
      <h1 className="title text-center md:text-left">{title}</h1>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-12 lg:gap-y-10 gap-y-5">
        {domainGroups?.slice(0, 8).map((domain, index) => (
          <Domain name={domain} key={index} />
        ))}
        <Domain name={i18n.t('landing:domains.see_all')} skip></Domain>
      </div>
    </section>
  );
};

export default Domains;
