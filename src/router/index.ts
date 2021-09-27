import Login from '../pages/Login'
import Register from '../pages/Register';
import RestorePassword from '../pages/RestorePassword';
import Error404 from '../pages/Error404';
import SetPassword from '../pages/SetPassword';
import Profile from '../components/Profile/ProfileInfo';
import Packs from '../pages/Packs';
import Cards from '../components/Cards/Cards';
import {ComponentType} from 'react';
import Learn from '../pages/Learn';

interface IRoute {
    path: string;
    component: ComponentType;
    exact: boolean;
}

export enum RouteNames {
    PACKS = '/packs',
    CARDS = '/packs/:id',
    PROFILE = '/profile',
    LOGIN = '/login',
    REGISTER = '/register',
    RESTORE = '/restore',
    SET_PASSWORD = '/set-password',
    ERROR = '/error',
    LEARN = '/learn/:id'
}

const privateRoutes: IRoute[] = [
    {path: RouteNames.PACKS, exact: true, component: Packs},
    {path: RouteNames.PROFILE, component: Profile, exact: true},
    {path: RouteNames.CARDS, component: Cards, exact: true},
    {path: RouteNames.LEARN, component: Learn, exact: true},
];

const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, component: Login, exact: true},
    {path: RouteNames.REGISTER, component: Register, exact: true},
    {path: RouteNames.RESTORE, component: RestorePassword, exact: true},
    {path: RouteNames.SET_PASSWORD, component: SetPassword, exact: true},
    {path: RouteNames.ERROR, component: Error404, exact: false},
];

export {
    publicRoutes,
    privateRoutes
}
