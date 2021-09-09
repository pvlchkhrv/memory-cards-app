import React from 'react';
import {Route, Switch} from 'react-router';
import {privateRoutes, publicRoutes} from '../router';
import {useAppSelector} from '../hooks/useAppSelector';

const AppRouter = () => {

    const {isAuth} = useAppSelector(state => state.auth)
    return (
        !isAuth ?
            <Switch>
                {publicRoutes.map(r =>
                    <Route component={r.component}
                           path={r.path}
                           exact={r.exact}
                           key={r.path}
                    />
                )}
            </Switch>
            :
            <Switch>
                {privateRoutes.map(r =>
                    <Route component={r.component}
                           path={r.path}
                           exact={r.exact}
                           key={r.path}
                    />
                )}
            </Switch>
    )
}

export default AppRouter;
