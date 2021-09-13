import React, {useEffect} from 'react';
import {LoginForm} from '../components/forms/login/LoginForm';
import {Redirect} from 'react-router';
import {LoginPayload} from '../store/reducers/auth/types';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../hooks/useAppSelector';
import {useActions} from '../hooks/useActions';


const Login = () => {
    const {user} = useAppSelector(state => state.auth);
    const {status} = useAppSelector(state => state.app);
    const {login, authMe} = useActions()
    const onSubmitHandler = (payload: LoginPayload) => {
        login(payload);
    };

    useEffect(() => {
        authMe();
    }, []);

    if (Object.keys(user).length !== 0) {
        return <Redirect to={'/Packs'}/>
    }

    return (
        <LoginForm onSubmitHandler={onSubmitHandler}
                   status={status}
        />
    );
};

export default Login;
