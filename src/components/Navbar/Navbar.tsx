import {AppBar, Button, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import React from 'react';
import s from './Navbar.module.css'
import {useAppSelector} from '../../hooks/useAppSelector';
import {useActions} from '../../hooks/useActions';

const Navbar = () => {
    console.log('NAVBAR')
    const isAuth = useAppSelector(state => state.auth.isAuth);
    const status = useAppSelector(state => state.app.status);
    const {logout} = useActions();
    return (
        <>
            <AppBar position='static' className={s.appbar}>
                <Toolbar className={s.toolbar}>
                    <Typography variant='h6' className={s.text}>
                        Learn whatever you need using spaced-repetition technique...
                    </Typography>
                    {
                        isAuth &&
                        <Button color='inherit'
                                onClick={() => logout()}
                                disabled={status === 'loading'}
                        >Sign Out</Button>
                    }
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress/>}
        </>
    );
};

export default Navbar;
