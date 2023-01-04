import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../../pages/landing/Landing';
import Organizations from '../../pages/organizations/Organizations';
import Layout from '../containers/Layout';
import About from '../../pages/about/About';
import Contact from '../../pages/contact/Contact';
import Services from '../../pages/services/Services';
import Organization from '../../pages/organizations/Organization';
import { MENU_ROUTES_HREF } from '../constants/Menu.constants';
import Service from '../../pages/services/Service';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { parse, stringify } from 'query-string';
import ScrollToTop from '../scroll-to-top/ScrollToTop';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <QueryParamProvider
        adapter={ReactRouter6Adapter}
        options={{
          searchStringToObject: parse,
          objectToSearchString: stringify,
        }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Landing page */}
            <Route index element={<Landing />}></Route>

            {/* Services page */}
            {/* Practice programs page */}
            <Route path={MENU_ROUTES_HREF.services} element={<Services />}></Route>

            <Route path={`${MENU_ROUTES_HREF.services}/:serviceId`} element={<Service />}></Route>

            {/* NGO list page */}
            <Route path={MENU_ROUTES_HREF.organizations} element={<Organizations />}></Route>

            {/* NGO details page */}
            <Route
              path={`${MENU_ROUTES_HREF.organizations}/:organizationId`}
              element={<Organization />}
            ></Route>

            {/* Service Page from NGO Details - For Breadcurmbs purpose only */}
            <Route
              path={`${MENU_ROUTES_HREF.organizations}/:organizationId/${MENU_ROUTES_HREF.service}/:serviceId`}
              element={<Service />}
            ></Route>

            {/* Contact page */}
            <Route path={MENU_ROUTES_HREF.contact} element={<Contact />}></Route>

            {/* About page */}
            <Route path={MENU_ROUTES_HREF.about} element={<About />}></Route>
          </Route>

          {/* Wild Card */}
          <Route path="*" element={<Navigate to={'/'}></Navigate>}></Route>
        </Routes>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export default Router;
