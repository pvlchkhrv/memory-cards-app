import React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {privateRoutes, publicRoutes, RouteNames} from '../router';
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
                <Redirect to={RouteNames.LOGIN}/>
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
                <Redirect to={RouteNames.PACKS}/>
            </Switch>
    )
}

export default AppRouter;
