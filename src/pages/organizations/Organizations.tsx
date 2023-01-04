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
import ShapeWrapper from '../../common/components/shape-wrapper/ShapeWrapper';

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
        <ShapeWrapper>
          <div className="min-h-[30rem] px-[10%] sm:px-[5%] pb-28 sm:pb-40">
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
                        data.pages[0].meta.totalItems > 1
                          ? t('many_organizations_title')
                          : t('one_organization_title')
                      }
                    />
                  ) : (
                    <></>
                  );
                },
              }}
            />
          </div>
        </ShapeWrapper>
      )}
    </section>
  );
};

export default Organizations;
