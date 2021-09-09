import React from 'react'
import s from './Header.module.css'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt'
import {Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {useActions} from '../hooks/useActions';

const Header = () => {
    const dispatch = useDispatch()
    const {logout} = useActions();

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
                <Button onClick={logout}>
                    Sign Out
                </Button>
            </div>
        </header>
    )
}

export default Header;
