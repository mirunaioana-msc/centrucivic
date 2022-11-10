import React from 'react';
import { useTranslation } from 'react-i18next';
import Loading from '../loading/Loading';

interface InfiniteScrollFooterProps {
  isLoading: boolean;
  hasNoData: boolean;
  hasReachedTheEnd: boolean;
}

const InfiniteScrollFooter = ({
  isLoading,
  hasNoData,
  hasReachedTheEnd,
}: InfiniteScrollFooterProps) => {
  const { t } = useTranslation('common');

  if (isLoading) {
    return <Loading />;
  }

  if (hasNoData) {
    return <div className="w-full flex items-center justify-center">{t('no_results')}</div>;
  }

  if (hasReachedTheEnd) {
    return <div className="w-full flex items-center justify-center pt-8">{t('end_of_list')}</div>;
  }

  return <></>;
};

export default InfiniteScrollFooter;
