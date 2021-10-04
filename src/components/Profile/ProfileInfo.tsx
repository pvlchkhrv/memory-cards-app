import React from 'react';
import {Avatar, Badge, Paper, styled} from '@material-ui/core';
import s from './ProfileInfo.module.css';
import UserInfoBlock from '../Packs/AsideBar/UserInfoBlock';
import {useAppSelector} from '../../hooks/useAppSelector';
const ProfileInfo = () => {
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
        <Paper className={s.profile}>
            <h3>Personal Information</h3>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                    <SmallAvatar alt="" src={''}/>
                }
            >
                <BigAvatar alt="profile avatar" src={user.avatar}/>
            </Badge>

        </Paper>
    );
};

export default ProfileInfo;
