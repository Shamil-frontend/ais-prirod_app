import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorIndicator from '../ErrorIndicator';

class ErrorBoundry extends Component {
  state = {
    error: null,
  };

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <ErrorIndicator error={error} />;
    }

    return children;
  }
}

ErrorBoundry.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ErrorBoundry;
