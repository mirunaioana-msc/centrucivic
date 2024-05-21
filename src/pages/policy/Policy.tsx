import React from 'react';
import { useTranslation } from 'react-i18next';

const Policy = () => {
  const { t } = useTranslation('policy');
  return (
    <div className="wrapper grid gap-y-16 max-w-full">
      <div className='text-wrap' dangerouslySetInnerHTML={{ __html: t('policy:policy') }}>
      </div>
    </div>
  );
};

export default Policy;
