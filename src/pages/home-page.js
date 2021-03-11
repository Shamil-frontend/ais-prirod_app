import React from 'react';
import {
  // BreadcrumbsProvider,
  // Breadcrumbs,
  BreadcrumbsItem
} from 'react-breadcrumbs-dynamic'

const IndividualsPage = () => (
  <>
    <BreadcrumbsItem to='/home'>Home</BreadcrumbsItem>
    <h1 className="page-title">Главная</h1>
  </>
);

export default IndividualsPage;
