import React from 'react'
import {RegisterForm} from '../components/forms/register/RegisterForm'
import {RegisterPayloadType} from '../types/authTypes'
import {useDispatch} from 'react-redux'
import {register} from '../store/reducers/authReducer'
import {useAppSelector} from '../store';
import RegisteredSuccess from '../components/forms/register/RegisteredSuccess';


const Register = () => {
    const dispatch = useDispatch()
    const isRegistered = useAppSelector(state => state.auth.isRegistered)
    const onSubmitHandler = (payload: RegisterPayloadType) => {
        dispatch(register(payload))
    }

    if (isRegistered) {
        return <RegisteredSuccess/>
    }
    return (
        <div >
            <RegisterForm onSubmitHandler={onSubmitHandler}/>
        </div>
    );
};

export default Register;
