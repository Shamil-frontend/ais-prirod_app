import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AppLayout from '../components/AppLayout';

import LoadingIndicator from '../components/generic/LoadingIndicator';

const HomePage = lazy(() => import('./home-page'));
const IndividualsPage = lazy(() => import('./individuals-page'));
const HuntingFarmPage = lazy(() => import('./reference/huntingFarm-page'));
const ReferenceSidebarPage = lazy(() => import('./referenceSidebar-page'));
const NotFoundPage = lazy(() => import('./not-found-page'));

const AppView = () => (
  <AppLayout>
    <Suspense fallback={<LoadingIndicator />}>
      <Switch>
        <Redirect from="/" to="/home" exact />
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/individuals">
          <IndividualsPage />
        </Route>
        <Route path="/reference" exact>
          <ReferenceSidebarPage />
        </Route>
        <Route path="/reference/huntingFarm">
          <HuntingFarmPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Suspense>
  </AppLayout>
);

export default AppView;
