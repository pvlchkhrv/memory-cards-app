import React, {useEffect} from 'react';
import {Paper} from '@material-ui/core';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import s from './CheckEmail.module.css';
import {useHistory} from 'react-router';

type CheckEmailPropsType = {
    info: string | null
}

const CheckEmail: React.FC<CheckEmailPropsType> = ({info}) => {
    const history = useHistory();
    useEffect(() => {
        setTimeout(() => history.push('/login'), 3000)
    }, [])

    return (
            <Paper elevation={3} className={s.paper}>
                <DraftsTwoToneIcon fontSize='large'/>
                <h3>{info}</h3>
                <p>Check you email</p>
            </Paper>
    );
};

export default CheckEmail;
