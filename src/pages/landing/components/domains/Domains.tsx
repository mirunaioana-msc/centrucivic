import React from 'react';
import i18n from '../../../../common/configs/i18n';
import { IconTypes } from '../../../../common/enums/IconTypes.enum';
import Domain from './Domain';

export interface IDomain {
  icon: IconTypes;
  name: string;
}

interface Domains {
  domains: IDomain[];
}

const Domains = ({ domains }: Domains) => {
  const title = i18n.t('landing:domains:title');
  return (
    <div className="sm:px-30 sm:py-20 lg:px-40 lg:py-24 xl:px-60 xl:py-32 xs:px-10 xs:py-10 px-5 py-5">
      <p className="title">{title}</p>
      <div className="grid sm:gap-10 lg:gap-12 xl:gap-16 gap-3 md:grid-cols-3 grid-cols-2">
        {domains.map((domain, index) => (
          <Domain name={domain.name} icon={domain.icon} key={index}></Domain>
        ))}
      </div>
    </div>
  );
};

export default Domains;
