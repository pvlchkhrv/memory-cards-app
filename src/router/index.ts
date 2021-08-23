import Login from '../pages/Login'
import Register from '../pages/Register';
import RestorePassword from '../pages/RestorePassword';
import Error404 from '../pages/Error404';
import SetPassword from '../pages/SetPassword';

// const privateRoutes = [
//     // {path: '/profile', component: {}, exact: true},

// ];

const publicRoutes = [
    {path: '/login', component: Login, exact: false},
    {path: '/', component: Login, exact: true},
    {path: '/register', component: Register, exact: true},
    {path: '/restore', component: RestorePassword, exact: true},
    {path: '/set-password', component: SetPassword, exact: true},
    {path:'/error', component: Error404, exact: false},
];

export {
    publicRoutes
}
