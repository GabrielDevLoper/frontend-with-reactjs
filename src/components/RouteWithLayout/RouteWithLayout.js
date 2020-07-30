import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Context } from '../../context/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';

const RouteWithLayout = props => {
  const {
    isPrivate,
    isPrivateRole,
    layout: Layout,
    component: Component,
    ...rest
  } = props;

  const { authenticated, loading } = useContext(Context);
  const role = localStorage.getItem('role');

  if (loading) {
    return <CircularProgress />;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/sign-in" />;
  }

  if (isPrivateRole && role !== 'ADMIN') {
    return <Redirect to="/not-found" />;
  }

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
