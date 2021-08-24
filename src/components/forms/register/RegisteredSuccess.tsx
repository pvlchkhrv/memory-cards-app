import React, {useEffect} from 'react';
import {Paper} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import s from './RegisteredSuccess.module.css';
import {useHistory} from 'react-router';

const RegisteredSuccess: React.FC<{}> = () => {
    const history = useHistory();
    useEffect(() => {
        setTimeout(() => history.push('/login'), 2000)
    }, [])

    return (
            <Paper elevation={3} className={s.paper}>
                <LockOpenIcon fontSize='large'/>
                <h3>You've been successfully registered</h3>
                <p>Please Sign In on the Login Page</p>
            </Paper>
    );
};

export default RegisteredSuccess;
