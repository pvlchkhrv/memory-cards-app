import React from 'react';
import {RegisterForm} from '../components/forms/register/RegisterForm';
import {RegisterPayload} from '../store/reducers/auth/types';
import RegisteredSuccess from '../components/forms/register/RegisteredSuccess';
import {useAppSelector} from '../hooks/useAppSelector';


const Register = () => {
    return (
        <div>
            <RegisterForm/>
        </div>
    );
};

export default Register;
