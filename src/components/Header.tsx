import React from 'react'
import s from './Header.module.css'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt'
import {Button} from '@material-ui/core';
import {logout} from '../store/reducers/authReducer';
import {useDispatch} from 'react-redux';

const Header = () => {
    const dispatch = useDispatch()
    const onLogoutHandler = () => dispatch(logout())

    return (
        <header className={s.header}>
            <div className={s.itemsContainer}>
                <div className={s.packsItem}>
                    <FormatListBulletedIcon fontSize='large'/>
                    <span className={s.text}>Packs List</span>
                </div>
                <div className={s.profileItem}>
                    <SentimentSatisfiedAltIcon fontSize='large'/>
                    <span className={s.text}>Profile</span>
                </div>
            </div>
            <div>
                <Button onClick={onLogoutHandler}>
                    Sign Out
                </Button>
            </div>
        </header>
    )
}

export default Header;
