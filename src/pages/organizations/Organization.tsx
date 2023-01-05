import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { VirtuosoGrid } from 'react-virtuoso';
import InfiniteScrollFooter from '../../common/components/infinite-scroll-footer/InfiniteScrollFooter';
import { useOrganization } from '../../services/organization/Organization.queries';
import ServiceItem from '../services/components/ServiceItem';
import OrganizationDetails from './components/OrganizationDetails';
import ListError from '../../common/components/list-error/ListError';
import Breadcrumbs from '../../common/components/breadcrumbs/Breadcrumbs';
import { MENU_ROUTES_HREF } from '../../common/constants/Menu.constants';

const Organization = () => {
  const { organizationId } = useParams();

  const navigate = useNavigate();

  const { t } = useTranslation('organizations');

  const { data, isLoading, error, refetch } = useOrganization(organizationId as string);

  const onNavigate = (serviceId: number) => {
    navigate(
      `/${MENU_ROUTES_HREF.organizations}/${organizationId}/${MENU_ROUTES_HREF.service}/${serviceId}`,
    );
  };

  return (
    <div className="w-full bg-gray-100">
      <div className="wrapper pt-5">
        <Breadcrumbs />
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
                    onNavigate={onNavigate.bind(null, service.id)}
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
    </div>
  );
};

export default Organization;
