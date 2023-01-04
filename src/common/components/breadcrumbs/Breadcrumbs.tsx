import React from 'react';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/solid';
import { NavLink, useLocation } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import i18n from '../../configs/i18n';
import { MENU_ROUTES_HREF } from '../../constants/Menu.constants';
import { useBreadcrumbsState } from '../../../store/Selectors';

const DynamicService = () => {
  const { serviceName } = useBreadcrumbsState();
  return <span>{serviceName || ''}</span>;
};

const DynamicOrganization = () => {
  const { organizationName } = useBreadcrumbsState();
  return <span>{organizationName || ''}</span>;
};

const HomeBreadcrumb = () => {
  return (
    <span>
      <HomeIcon className="w-5 h-5" />
    </span>
  );
};

const routes = [
  { path: '', breadcrumb: HomeBreadcrumb },
  { path: `/${MENU_ROUTES_HREF.services}`, breadcrumb: i18n.t('menu:services') },
  { path: `/${MENU_ROUTES_HREF.services}/:serviceId`, breadcrumb: DynamicService },
  { path: `/${MENU_ROUTES_HREF.organizations}`, breadcrumb: i18n.t('menu:organizations') },
  { path: `/${MENU_ROUTES_HREF.organizations}/:organizationId`, breadcrumb: DynamicOrganization },
  {
    path: `/${MENU_ROUTES_HREF.organizations}/:organizationId/:serviceId`,
    breadcrumb: DynamicService,
  },
];

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routes);
  const location = useLocation();

  // Breadcrums must not be displayed on certain pages.
  if (
    location.pathname === '/' ||
    location.pathname == `/${MENU_ROUTES_HREF.organizations}` ||
    location.pathname == `/${MENU_ROUTES_HREF.services}` ||
    location.pathname == `/${MENU_ROUTES_HREF.about}` ||
    location.pathname == `/${MENU_ROUTES_HREF.contact}`
  ) {
    return <></>;
  }

  return (
    <div className="flex flex-row gap-2">
      {breadcrumbs.map(({ match, breadcrumb }, index) => {
        return (
          <span key={match.pathname}>
            <NavLink
              className="text-gray-1000 flex gap-2 items-center hover:underline"
              to={match.pathname}
            >
              {breadcrumb}{' '}
              {index < breadcrumbs.length - 1 && <ChevronRightIcon className="w-4 h-4" />}
            </NavLink>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
