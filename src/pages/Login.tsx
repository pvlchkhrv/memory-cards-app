import React from 'react';
import {LoginForm} from '../components/forms/login/LoginForm';
import {useAppSelector} from '../store';
import {Redirect} from 'react-router';
import {LoginPayloadType} from '../types/authTypes';
import {login} from '../store/reducers/authReducer';
import {useDispatch} from 'react-redux';


const Login = () => {
    const dispatch = useDispatch()
    const {user} = useAppSelector(state => state.auth)
    const onSubmitHandler = (payload: LoginPayloadType) => {
        dispatch(login(payload))
    }

    if (user) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <LoginForm onSubmitHandler={onSubmitHandler}/>
        </div>
    );
};

export default Login;
