import React from 'react';
import { useTranslation } from 'react-i18next';
import Loading from '../loading/Loading';

interface InfiniteScrollFooterProps {
  isLoading: boolean;
  hasNoData: boolean;
}

const InfiniteScrollFooter = ({ isLoading, hasNoData }: InfiniteScrollFooterProps) => {
  const { t } = useTranslation('common');

  if (isLoading) {
    return <Loading />;
  }

  if (hasNoData) {
    return <div className="w-full flex items-center justify-center px-10">{t('no_results')}</div>;
  }

  return <></>;
};

export default InfiniteScrollFooter;
