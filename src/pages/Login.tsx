import React from 'react';
import {LoginForm} from '../components/forms/login/LoginForm';


const Login = () => {
    const onSubmitHandler = (values: { email: string, password: string, rememberMe: boolean }) => {
    }
    return (
        <div>
            <LoginForm onSubmitHandler={onSubmitHandler}/>
        </div>
    );
};

export default Login;
