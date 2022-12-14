import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { VirtuosoGrid } from 'react-virtuoso';
import { useServicesQuery } from '../../services/service/Services.queries';
import { useServices } from '../../store/Selectors';
import ServiceSearch from '../../common/components/service-search/ServiceSearch';
import ServiceItem from './components/ServiceItem';
import { useQueryParams } from 'use-query-params';
import { SERVICES_QUERY_PARAMS } from '../../common/constants/Services.constants';
import { AgeCategory } from '../../common/enums/AgeCategory.enum';
import InfiniteScrollFooter from '../../common/components/infinite-scroll-footer/InfiniteScrollFooter';
import ListError from '../../common/components/list-error/ListError';

const Services = () => {
  const { t } = useTranslation('services');
  const [query, setQuery] = useQueryParams(SERVICES_QUERY_PARAMS);

  const {
    services,
    meta: { totalItems: total },
  } = useServices();

  const { isLoading, error, refetch } = useServicesQuery(
    query?.page as number,
    query?.search,
    query?.locationId,
    query?.ageCategories as AgeCategory[],
    query?.domains,
    query?.start,
    query?.end,
  );

  useEffect(() => {
    setQuery({ ...query, page: 1 });
  }, []);

  const loadMore = useCallback(() => {
    if (total > services.length) setQuery({ ...query, page: query?.page ? query?.page + 1 : 1 });
  }, [services, total]);

  return (
    <section className="w-full">
      <ServiceSearch>
        {error && !isLoading ? (
          <ListError retry={refetch}>{t('errors.search')}</ListError>
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
                components={{
                  Footer: () => (
                    <InfiniteScrollFooter
                      hasNoData={services?.length === 0}
                      isLoading={isLoading}
                    />
                  ),
                }}
              />
            </div>
          </div>
        )}
      </ServiceSearch>
    </section>
  );
};

export default Services;
