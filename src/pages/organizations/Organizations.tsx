import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VirtuosoGrid } from 'react-virtuoso';
import InfiniteScrollFooter from '../../common/components/infinite-scroll-footer/InfiniteScrollFooter';
import NGOSearch from '../../common/components/ngo-search/NGOSearch';
import { ORGANIZATIONS_QUERY_PARAMS } from '../../common/constants/Organizations.constants';
import { useOrganizationQuery } from '../../services/organization/Organization.queries';
import { useOrganizations } from '../../store/Selectors';
import OrganizationItem from './components/OrganizationItem';
import { useQueryParams } from 'use-query-params';
import ListError from '../../common/components/list-error/ListError';

const Organizations = () => {
  const { t } = useTranslation('organizations');
  const [page, setPage] = useState<number>(1);
  const [query] = useQueryParams(ORGANIZATIONS_QUERY_PARAMS);

  const {
    organizations,
    meta: { totalItems: total },
  } = useOrganizations();

  const { isLoading, error, refetch } = useOrganizationQuery(
    page,
    query?.search,
    query?.locationId,
    query?.domains,
  );

  const loadMore = useCallback(() => {
    if (total > organizations.length) setPage(page + 1);
  }, [organizations, total]);

  return (
    <section className="w-full">
      <NGOSearch showFilters>
        {error && !isLoading ? (
          <ListError retry={refetch}>{t('errors.search')}</ListError>
        ) : (
          <div className="flex flex-col w-full lg:px-60 px-10 pt-10">
            {organizations.length !== 0 && !isLoading && (
              <p className="title text-center">{`${total} ${
                total > 1 ? t('many_organizations_title') : t('one_organization_title')
              }`}</p>
            )}
            <div className="mb-[10rem]">
              <VirtuosoGrid
                useWindowScroll
                style={{ height: '100vw' }}
                context={{ loadMore }}
                endReached={loadMore}
                overscan={200}
                data={organizations}
                itemContent={(index, ong) => <OrganizationItem key={index} organization={ong} />}
                itemClassName="virtuso-grid-item"
                listClassName="virtuso-grid-list"
                components={{
                  Footer: () => (
                    <InfiniteScrollFooter
                      hasNoData={organizations?.length === 0}
                      isLoading={isLoading}
                    />
                  ),
                }}
              />
            </div>
          </div>
        )}
      </NGOSearch>
    </section>
  );
};

export default Organizations;
