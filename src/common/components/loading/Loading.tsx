import React from 'react';
import { useTranslation } from 'react-i18next';

const Loading = () => {
  const { t } = useTranslation('common');
  return <div className="w-full flex items-center justify-center pt-8">{t('loading')}</div>;
};

export default Loading;
