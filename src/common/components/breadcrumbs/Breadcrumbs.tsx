import React from 'react';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/solid';
import { NavLink, useLocation } from 'react-router-dom';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import i18n from '../../configs/i18n';
import { MENU_ROUTES_HREF } from '../../constants/Menu.constants';
import { useSelectedService } from '../../../store/services/Services.selectors';
import { useSelectedOrganization } from '../../../store/Selectors';

const DynamicPracticeProgram = ({ match }: any) => {
  const { selectedService } = useSelectedService();

  return (
    <span>{selectedService?.name || match.params.id}</span>
  )
};

const DynamicOrganization = ({ match }: any) => {
  const { selectedOrganization } = useSelectedOrganization();

  return (
    <span>{selectedOrganization?.name || match.params.id}</span>
  )
};

const HomeBreadcrumb = () => {
  return (
    <span><HomeIcon className='w-5 h-5' /></span>
  )
};

const routes = [
  { path: "", breadcrumb: HomeBreadcrumb },
  { path: `/${MENU_ROUTES_HREF.services}`, breadcrumb: i18n.t('menu:serbvices') },
  { path: `/${MENU_ROUTES_HREF.services}/:id`, breadcrumb: DynamicPracticeProgram },
  { path: `/${MENU_ROUTES_HREF.organizations}`, breadcrumb: i18n.t('menu:organizations') },
  { path: `/${MENU_ROUTES_HREF.organizations}/:id`, breadcrumb: DynamicOrganization },
  { path: `/${MENU_ROUTES_HREF.about}`, breadcrumb: i18n.t('menu:about') },
  { path: `/${MENU_ROUTES_HREF.contact}`, breadcrumb: i18n.t('menu:contact') },
];

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routes);
  const location = useLocation();

  // Breadcrums must not be displayed on certain pages.
  if (
    location.pathname === '/' ||
    location.pathname == `/${MENU_ROUTES_HREF.organizations}` ||
    location.pathname == `/${MENU_ROUTES_HREF.services}`) {
    return <></>
  }

  return (
    <div className='flex gap-2 items-center lg:px-60 md:px-20 sm:px-8 px-2 py-4'>
      {breadcrumbs.map(({
        match,
        breadcrumb
      }, index) => (
        <span key={match.pathname}>
          <NavLink className="text-gray-1000 flex gap-2 items-center hover:underline" to={match.pathname}>{breadcrumb} {(index < breadcrumbs.length - 1) && <ChevronRightIcon className='w-4 h-4' />}</NavLink>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;