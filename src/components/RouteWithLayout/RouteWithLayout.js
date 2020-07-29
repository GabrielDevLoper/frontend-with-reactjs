import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Context } from '../../context/AuthContext';

const RouteWithLayout = props => {
  const { isPrivate, layout: Layout, component: Component, ...rest } = props;

  const { authenticated, loading } = useContext(Context);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/sign-in" />;
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
