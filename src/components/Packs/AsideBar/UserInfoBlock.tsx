import React from 'react';
import s from './AsideBar.module.css';
import {Avatar, Badge, styled} from '@material-ui/core';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {RouteNames} from '../../../router';
import {NavLink} from 'react-router-dom';

const UserInfoBlock = () => {
    console.log('USER INFO BLOCK');
    const user = useAppSelector(state => state.auth.user);
    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.background.paper}`,
    }));
    const BigAvatar = styled(Avatar)(({theme}) => ({
        width: 200,
        height: 200
    }))

    return (
        <div className={s.userInfoBlock}>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                    <SmallAvatar alt="" src={''}/>
                }
            >
                <BigAvatar alt="profile avatar" src={user.avatar}/>
            </Badge>
            <div>
                <NavLink to={RouteNames.PROFILE}>{user.name}</NavLink>
            </div>
        </div>
    );
};

export default UserInfoBlock;
