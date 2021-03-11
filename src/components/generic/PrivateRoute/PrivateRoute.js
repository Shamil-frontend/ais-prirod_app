import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { getAccessToken } from '../../../services/authService';

const PrivateRoute = ({ children: Component, path, exact }) => {
  const authUser = getAccessToken();

  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) =>
        authUser ? (
          Component
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.defaultProps = {
  exact: false,
};

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

export default PrivateRoute;
