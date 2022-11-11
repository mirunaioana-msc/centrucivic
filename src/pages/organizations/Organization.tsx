import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { VirtuosoGrid } from 'react-virtuoso';
import Loading from '../../common/components/loading/Loading';
import NoData from '../../common/components/no-data/NoData';
import ShapeWrapper from '../../common/components/shape-wrapper/ShapeWrapper';
import { useOrganization } from '../../services/organization/Organization.queries';
import ServiceItem from '../services/components/ServiceItem';
import OrganizationDetails from './components/OrganizationDetails';

const Organization = () => {
  const { id } = useParams();

  const { t } = useTranslation('organization_details');

  const { data, isLoading, error, refetch } = useOrganization(id as string);

  return (
    <ShapeWrapper>
      <div className="w-full xl:px-60 px-4 lg:py-20 py-10">
        <>
          {data && !isLoading && (
            <div className="content">
              <OrganizationDetails organization={data}></OrganizationDetails>
              <h2 className="subtitle mt-10">{t('programs_title')}</h2>
              <VirtuosoGrid
                useWindowScroll
                style={{ height: '100vw' }}
                overscan={200}
                data={data.services}
                itemContent={(index: any, service: any) => <ServiceItem key={index} service={service} />}
                itemClassName='virtuso-grid-item'
                listClassName='virtuso-grid-list'
              />
            </div>
          )}
          {error && !isLoading && <NoData retry={refetch}>{t('errors.get')}</NoData>}
          {isLoading && <Loading />}
        </>
      </div>
    </ShapeWrapper>
  );
};

export default Organization;
