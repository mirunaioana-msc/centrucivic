import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { VirtuosoGrid } from 'react-virtuoso';
import useStore from '../../store/Store';
import { useServicesQuery } from '../../services/service/Services.queries';
import NoData from '../../common/components/no-data/NoData';
import InfiniteScrollFooter from '../../common/components/infinite-scroll-footer/InfiniteScrollFooter';
import { useServices } from '../../store/Selectors';
import ServiceSearch from '../../common/components/service-search/ServiceSearch';
import ServiceItem from './components/ServiceItem';

const Services = () => {
  const { t } = useTranslation('services');
  const { nextPageServices } = useStore();

  const {
    services,
    meta: { totalItems: total },
  } = useServices();

  const { isLoading, error, refetch } = useServicesQuery();

  const loadMore = useCallback(() => {
    if (total > services.length) nextPageServices();
  }, [services, total]);

  return (
    <section className="w-full">
      <ServiceSearch showFilters preloadData>
        {error && !isLoading ? (
          <NoData retry={refetch}>{t('errors.search')}</NoData>
        ) : (
          <div className="flex flex-col w-full px-4 sm:px-8 md:px-16 lg:px-40 pt-10">
            {services.length !== 0 && !isLoading && (
              <p className="title text-center">{`${total} ${
                total > 1 ? t('many_services_title') : t('one_service_title')
              }`}</p>
            )}
            <div className="mb-[10rem]">
              <VirtuosoGrid
                useWindowScroll
                style={{ height: '100vw' }}
                context={{ loadMore }}
                endReached={loadMore}
                overscan={200}
                data={services}
                itemContent={(index, service) =>
                  service && <ServiceItem key={index} service={service} />
                }
                itemClassName="virtuso-grid-item"
                listClassName="virtuso-grid-list"
              />
            </div>
          </div>
        )}
      </ServiceSearch>
    </section>
  );
};

export default Services;
