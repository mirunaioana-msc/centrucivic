import React from 'react';
import i18n from '../../../../common/configs/i18n';
import { DOMAINS } from '../../../../common/constants/nomenclature.constants';
import { useNomenclature } from '../../../../store/Selectors';
import Domain from './Domain';

const Domains = () => {
  const title = i18n.t('common:domains');
  const { domains } = useNomenclature();
  return (
    <div className="sm:px-30 sm:py-20 lg:px-40 lg:py-24 xl:px-60 xl:py-32 xs:px-10 xs:py-10 px-5 py-5">
      <p className="title">{title}</p>
      <div className="grid sm:gap-10 lg:gap-12 xl:gap-16 gap-3 md:grid-cols-3 grid-cols-2">
        {domains.map(
          (domain, index) =>
            DOMAINS.includes(domain.name) && (
              <Domain name={domain.name} id={domain.id} key={index}></Domain>
            ),
        )}
      </div>
    </div>
  );
};

export default Domains;
