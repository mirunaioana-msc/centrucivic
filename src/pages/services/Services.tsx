import React from 'react';
import { useTranslation } from 'react-i18next';
import { VirtuosoGrid } from 'react-virtuoso';
import ServiceSearch from '../../common/components/service-search/ServiceSearch';
import ServiceItem from './components/ServiceItem';
import { useQueryParams } from 'use-query-params';
import { SERVICES_QUERY_PARAMS } from '../../common/constants/Services.constants';
import InfiniteScrollFooter from '../../common/components/infinite-scroll-footer/InfiniteScrollFooter';
import ListError from '../../common/components/list-error/ListError';
import { userCivicCenterServicesInfiniteQuery } from '../../services/service/Services.queries';
import { CivicCenterQuery } from '../../common/interfaces/CivicCenterQuery.interface';
import ShapeWrapper from '../../common/components/shape-wrapper/ShapeWrapper';
import { IService } from '../../common/interfaces/Service.interface';
import { mapPagesToItems } from '../../common/helpers/Format.helper';
import VirtuosoHeader from '../../common/components/virtuoso-header/VirtuosoHeader';
import { useNavigate } from 'react-router-dom';
import { MENU_ROUTES_HREF } from '../../common/constants/Menu.constants';

const Services = () => {
  const { t } = useTranslation('services');
  const navigate = useNavigate();
  const [query] = useQueryParams(SERVICES_QUERY_PARAMS);

  const { data, isFetching, fetchNextPage, hasNextPage, error, refetch } =
    userCivicCenterServicesInfiniteQuery(query as CivicCenterQuery);

  const loadMore = () => {
    if (!isFetching && hasNextPage) fetchNextPage();
  };

  const onNavigate = (serviceId: number) => {
    navigate(`/${MENU_ROUTES_HREF.services}/${serviceId}`);
  };

  return (
    <section className="w-full">
      <div className="bg-yellow w-full">
        <ServiceSearch />
      </div>
      <ShapeWrapper>
        <div className="min-h-[30rem] px-[10%] sm:px-[5%] pb-28 sm:pb-40">
          {error && !isFetching ? (
            <ListError retry={refetch}>{t('errors.search')}</ListError>
          ) : (
            <VirtuosoGrid
              useWindowScroll
              context={{ loadMore }}
              endReached={loadMore}
              overscan={200}
              data={mapPagesToItems<IService>(data?.pages)}
              itemContent={(index, service) => (
                <ServiceItem
                  key={index}
                  service={service}
                  onNavigate={onNavigate.bind(null, service.id)}
                />
              )}
              listClassName="virtuso-grid-list"
              components={{
                Footer: () => (
                  <InfiniteScrollFooter
                    hasNoData={data?.pages[0]?.items?.length === 0}
                    isLoading={isFetching}
                  />
                ),
                Header: () => {
                  return data?.pages[0].meta && !isFetching ? (
                    <VirtuosoHeader
                      totalItems={data.pages[0].meta.totalItems}
                      entities={
                        data.pages[0].meta.totalItems > 1
                          ? t('many_services_title')
                          : t('one_service_title')
                      }
                    />
                  ) : (
                    <></>
                  );
                },
              }}
            />
          )}
        </div>
      </ShapeWrapper>
    </section>
  );
};

export default Services;
