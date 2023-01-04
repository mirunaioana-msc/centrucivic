import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { VirtuosoGrid } from 'react-virtuoso';
import InfiniteScrollFooter from '../../common/components/infinite-scroll-footer/InfiniteScrollFooter';
import ShapeWrapper from '../../common/components/shape-wrapper/ShapeWrapper';
import { useOrganization } from '../../services/organization/Organization.queries';
import ServiceItem from '../services/components/ServiceItem';
import OrganizationDetails from './components/OrganizationDetails';
import ListError from '../../common/components/list-error/ListError';

const Organization = () => {
  const { id } = useParams();

  const { t } = useTranslation('organizations');

  const { data, isLoading, error, refetch } = useOrganization(id as string);

  return (
    <ShapeWrapper>
      <div className="w-full lg:py-20 py-10 px-[5%] lg:px-[10%] pb-5">
        <>
          {data && !isLoading && (
            <div className="content">
              <OrganizationDetails organization={data}></OrganizationDetails>
              <h2 className="subtitle mt-10 mb-5">{t('details.programs_title')}</h2>
              <VirtuosoGrid
                useWindowScroll
                overscan={200}
                data={data.services}
                itemContent={(index, service) => (
                  <ServiceItem
                    key={index}
                    service={{ ...service, logo: data.logo, organizationName: data.name }}
                  />
                )}
                listClassName="virtuso-grid-list"
                components={{
                  Footer: () => (
                    <InfiniteScrollFooter
                      hasNoData={data.services?.length === 0}
                      isLoading={isLoading}
                    />
                  ),
                }}
              />
            </div>
          )}
          {error && !isLoading && <ListError retry={refetch}>{t('details.errors.get')}</ListError>}
        </>
      </div>
    </ShapeWrapper>
  );
};

export default Organization;
