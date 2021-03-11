import React from 'react';
import PropTypes from 'prop-types';

import AppHeader from '../AppHeader';
import AppSidebar from '../AppSidebar';
// import Breadcrumb from 'react-bootstrap';
// import {
//   // BreadcrumbsProvider,
//   Breadcrumbs,
//   // BreadcrumbsItem
// } from 'react-breadcrumbs-dynamic'

import './AppLayout.scss';

const AppLayout = ({ children }) => (
  <div className="app">
    <AppHeader />
    <section className="app-container">
      <AppSidebar />
      <main className="app-content">
        {/* <Breadcrumbs /> */}
        <div className="app-content-body">{children}</div>
      </main>
    </section>
  </div>
);

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppLayout;
