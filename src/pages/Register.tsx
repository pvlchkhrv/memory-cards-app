import React from 'react';
import {RegisterForm} from '../components/forms/register/RegisterForm';


const Register = () => {
    return (
        <div >
            <RegisterForm onSubmitHandler={(values: {email: string, password: string}) => {}}/>
        </div>
    );
};

export default Register;
