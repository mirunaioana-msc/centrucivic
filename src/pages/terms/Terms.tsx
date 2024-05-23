import React from 'react';
import { useTranslation } from 'react-i18next';

const Terms = () => {
  const { t } = useTranslation('terms');
  return (
    <div className="wrapper grid gap-y-16 max-w-full">
      <div className='text-wrap' dangerouslySetInnerHTML={{ __html: t('terms:terms') }}>
      </div>
    </div>
  );
};

export default Terms;
