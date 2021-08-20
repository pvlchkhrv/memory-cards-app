import React from 'react';
import {RestorePasswordForm} from '../components/forms/restore-password/RestorePasswordForm';

const RestorePassword = () => {
    return (
        <div>
            <RestorePasswordForm onSubmitHandler={(values: {email: string}) => {}}/>
        </div>
    );
};

export default RestorePassword;
