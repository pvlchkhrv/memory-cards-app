import Login from '../pages/Login'
import Register from '../pages/Register';
import RestorePassword from '../pages/RestorePassword';
import Error404 from '../pages/Error404';
import SetPassword from '../pages/SetPassword';
import Profile from '../components/Profile/ProfileInfo';
import Packs from '../pages/Packs';
import CardsList from '../components/CardsList/CardsList';
import {ComponentType} from 'react';
import Learn from '../pages/Learn';

interface IRoute {
    path: string;
    component: ComponentType;
    exact?: boolean;
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
    {path: RouteNames.PROFILE, exact: true, component: Profile},
    {path: RouteNames.CARDS, exact: true, component: CardsList},
    {path: RouteNames.LEARN, exact: true, component: Learn},
];

const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, component: Login},
    {path: RouteNames.REGISTER, exact: true, component: Register},
    {path: RouteNames.RESTORE, exact: true, component: RestorePassword},
    {path: RouteNames.SET_PASSWORD, exact: true, component: SetPassword},
    {path: RouteNames.ERROR, exact: false, component: Error404},
];

export {
    publicRoutes,
    privateRoutes
}
