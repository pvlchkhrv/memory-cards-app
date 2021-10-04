import React from 'react';
import s from './AsideBar.module.css';
import {Avatar, Badge, Button, styled} from '@material-ui/core';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {RouteNames} from '../../../router';
import {NavLink} from 'react-router-dom';

const UserInfoBlock = () => {
    console.log('USER INFO BLOCK');
    const user = useAppSelector(state => state.auth.user);
    const BigAvatar = styled(Avatar)(({theme}) => ({
        width: 200,
        height: 200
    }))

    return (
        <div className={s.userInfoBlock}>
            <BigAvatar alt="profile avatar" src={user.avatar}/>
            <div>
                {user.name}
            </div>
            <div>
                <NavLink to={RouteNames.PROFILE} className={s.nav}>
                    <Button variant='contained'>Edit Profile</Button>
                </NavLink>
            </div>
        </div>
    );
};

export default UserInfoBlock;
