import Login from '../pages/Login'
import Register from '../pages/Register';
import RestorePassword from '../pages/RestorePassword';
import {SetPasswordForm} from '../components/forms/set-password/SetPassword';
import Error404 from '../pages/Error404';
// const privateRoutes = [
//     // {path: '/profile', component: {}, exact: true},

// ];

const publicRoutes = [
    {path: '/login', component: Login, exact: true},
    {path: '/register', component: Register, exact: true},
    {path: '/restore', component: RestorePassword, exact: true},
    {path: '/set-password', component: SetPasswordForm, exact: true},
    {path: '/', component: Error404, exact: false},

];

export {
    publicRoutes
}
