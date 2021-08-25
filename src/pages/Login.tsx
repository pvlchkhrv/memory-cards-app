import React, {useEffect} from 'react';
import {LoginForm} from '../components/forms/login/LoginForm';
import {useAppSelector} from '../store';
import {Redirect} from 'react-router';
import {LoginPayloadType} from '../types/authTypes';
import {authMe, login} from '../store/reducers/authReducer';
import {useDispatch} from 'react-redux';


const Login = () => {
    const dispatch = useDispatch()
    const user = useAppSelector(state => state.auth.user)
    const status = useAppSelector(state => state.app.status)
    const onSubmitHandler = (payload: LoginPayloadType) => {
        dispatch(login(payload))
    }

    useEffect(() => {
        dispatch(authMe())
    }, [])

    if (user) {
        return <Redirect to={'/packs'}/>
    }

    return (
        <div>
            <LoginForm onSubmitHandler={onSubmitHandler}
                       status={status}
            />
        </div>
    );
};

export default Login;
