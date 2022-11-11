import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { VirtuosoGrid } from 'react-virtuoso';
import InfiniteScrollFooter from '../../common/components/infinite-scroll-footer/InfiniteScrollFooter';
import NGOSearch from '../../common/components/ngo-search/NGOSearch';
import NoData from '../../common/components/no-data/NoData';
import { useOrganizationQuery } from '../../services/organization/Organization.queries';
import { useOrganizations } from '../../store/Selectors';
import useStore from '../../store/Store';
import OrganizationItem from './components/OrganizationItem';

const Organizations = () => {
  const { t } = useTranslation('organizations');
  const { nextPageOrganizations } = useStore();

  const {
    organizations,
    meta: { totalItems: total },
  } = useOrganizations();

  const { isLoading, error, refetch } = useOrganizationQuery();

  const loadMore = useCallback(() => {
    if (total > organizations.length) nextPageOrganizations();
  }, [organizations, total]);

  return (
    <section className="w-full">
      <NGOSearch showFilters>
        {error && !isLoading ? (
          <NoData retry={refetch}>{t('errors.search')}</NoData>
        ) : (
          <div className="flex flex-col w-full lg:px-60 px-10 pt-10">
            {organizations.length !== 0 && !isLoading && (
              <p className="title text-center">{`${total} ${total > 1 ? t('many_organizations_title') : t('one_organization_title')
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
                itemClassName='virtuso-grid-item'
                listClassName='virtuso-grid-list'
                components={{
                  Footer: () => (
                    <InfiniteScrollFooter
                      isLoading={isLoading}
                      hasNoData={organizations.length === 0}
                      hasReachedTheEnd={organizations.length === total}
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
