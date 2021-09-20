import {AppBar, Button, Toolbar, Typography} from '@material-ui/core';
import React from 'react';
import s from './Navbar.module.css'
import {useAppSelector} from '../../hooks/useAppSelector';
import {useActions} from '../../hooks/useActions';

const Navbar = () => {
    const {isAuth} = useAppSelector(state => state.auth);
    const {status} = useAppSelector(state => state.app);
    const {logout} = useActions();
    return (
        <AppBar position='static'>
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
    );
};

export default Navbar;
