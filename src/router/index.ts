import Login from '../pages/Login'
import Register from '../pages/Register';
import RestorePassword from '../pages/RestorePassword';
import Error404 from '../pages/Error404';
import SetPassword from '../pages/SetPassword';
import Profile from '../components/Profile';
import Packs from '../pages/Packs';

const privateRoutes = [
    {path: '/Packs', component: Packs, exact: true},
    {path: '/profile', component: Profile, exact: true},
];

const publicRoutes = [
    {path: '/', component: Packs, exact: true},
    {path: '/login', component: Login, exact: false},
    {path: '/register', component: Register, exact: true},
    {path: '/restore', component: RestorePassword, exact: true},
    {path: '/set-password', component: SetPassword, exact: true},
    {path:'/error', component: Error404, exact: false},
];

export {
    publicRoutes,
    privateRoutes
}
