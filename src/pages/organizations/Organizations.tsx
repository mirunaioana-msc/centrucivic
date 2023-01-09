import React from 'react';
import { useTranslation } from 'react-i18next';
import { VirtuosoGrid } from 'react-virtuoso';
import InfiniteScrollFooter from '../../common/components/infinite-scroll-footer/InfiniteScrollFooter';
import NGOSearch from '../../common/components/ngo-search/NGOSearch';
import { ORGANIZATIONS_QUERY_PARAMS } from '../../common/constants/Organizations.constants';
import { useOrganizationsInfiniteQuery } from '../../services/organization/Organization.queries';
import OrganizationItem from './components/OrganizationItem';
import { useQueryParams } from 'use-query-params';
import ListError from '../../common/components/list-error/ListError';
import { OrganizationQuery } from '../../common/interfaces/OrganizationQuery.interface';
import { mapPagesToItems } from '../../common/helpers/Format.helper';
import { OrganizationFlat } from '../../common/interfaces/OrganizationFlat.interface';
import VirtuosoHeader from '../../common/components/virtuoso-header/VirtuosoHeader';

const Organizations = () => {
  const { t } = useTranslation('organizations');
  const [query] = useQueryParams(ORGANIZATIONS_QUERY_PARAMS);

  const { data, isFetching, fetchNextPage, hasNextPage, error, refetch } =
    useOrganizationsInfiniteQuery(query as OrganizationQuery);

  const loadMore = () => {
    if (!isFetching && hasNextPage) fetchNextPage();
  };

  return (
    <section className="w-full">
      <NGOSearch showFilters />
      {error && !isFetching ? (
        <ListError retry={refetch}>{t('errors.search')}</ListError>
      ) : (
        <div className="sm:min-h-[calc(100vh-30rem)] min-h-[40rem] bg-gray-100 w-full">
          <div className="wrapper sm:pb-40 pb-28 sm:w-[90%] lg:max-w-screen-3xl">
            <VirtuosoGrid
              useWindowScroll
              context={{ loadMore }}
              endReached={loadMore}
              overscan={200}
              data={mapPagesToItems<OrganizationFlat>(data?.pages)}
              itemContent={(index, ong) => <OrganizationItem key={index} organization={ong} />}
              itemClassName="virtuso-grid-item"
              listClassName="virtuso-grid-list"
              components={{
                Footer: () => (
                  <InfiniteScrollFooter
                    hasNoData={data?.pages[0]?.items?.length === 0}
                    isLoading={isFetching}
                  />
                ),
                Header: () => {
                  return data?.pages[0]?.meta && !isFetching ? (
                    <VirtuosoHeader
                      totalItems={data.pages[0].meta.totalItems}
                      entities={
                        data.pages[0].meta.totalItems === 1
                          ? t('one_organization_title')
                          : t('many_organizations_title')
                      }
                    />
                  ) : (
                    <></>
                  );
                },
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Organizations;
