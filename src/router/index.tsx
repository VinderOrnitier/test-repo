import React, { useMemo } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { VLoader } from '../components';

import { history } from '../utils';
import requireLogin from './guards/requireLogin';
import getRoutes from './routes';

const GLOBAL_GUARDS = [requireLogin];

const AppRouter = ({ children }: any) => {
  const routes = useMemo(() => getRoutes(), []);
  return (
    <Router history={history}>
      <GuardProvider
        guards={GLOBAL_GUARDS}
        loading={() => <VLoader className="h-64" />}
        error={() => <h1>Guards Error</h1>}
      >
        <Route
          render={(routeProps) =>
            children(
              <Switch>
                {routes.map(({ path, component, exact, loading, meta, error, ignoreGlobal }, i) => (
                  <GuardedRoute
                    key={i}
                    path={path}
                    component={component}
                    exact={exact}
                    loading={loading}
                    error={error}
                    meta={meta}
                    ignoreGlobal={ignoreGlobal}
                  />
                ))}
              </Switch>,
              routeProps
            )
          }
        />
      </GuardProvider>
    </Router>
  );
};

export default AppRouter;
