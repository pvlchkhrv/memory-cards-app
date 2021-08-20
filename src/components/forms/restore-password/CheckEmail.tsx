import React, {useEffect} from 'react';
import {Paper} from '@material-ui/core';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import s from './CheckEmail.module.css';
import {useHistory} from 'react-router';

type CheckEmailPropsType = {
    email: string;
}

const CheckEmail: React.FC<CheckEmailPropsType> = ({email}) => {
    const history = useHistory();
    useEffect(() => {
        setTimeout(() => history.push('/login'), 2000)
    }, [])

    return (
            <Paper elevation={3} className={s.paper}>
                <DraftsTwoToneIcon fontSize='large'/>
                <h3>Check Your Email</h3>
                <p>We’ve sent instructions to {email}</p>
            </Paper>
    );
};

export default CheckEmail;
