import React from 'react';
import {Route, Switch} from 'react-router';
import {publicRoutes} from '../router';

const AppRouter = () => {
    return (
        <Switch>
            {publicRoutes.map(r =>
                <Route component={r.component}
                       path={r.path}
                       exact={r.exact}
                       key={r.path}
                />
            )}
        </Switch>
    );
}

export default AppRouter;
