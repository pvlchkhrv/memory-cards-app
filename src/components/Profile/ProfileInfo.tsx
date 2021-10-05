import React, {ChangeEvent, useState} from 'react';
import {Avatar, Badge, Box, IconButton, Input, Paper, styled} from '@material-ui/core';
import s from './ProfileInfo.module.css';
import {useAppSelector} from '../../hooks/useAppSelector';
import LayersIcon from '@material-ui/icons/Layers';
import {EditableSpan} from '../common/editable-span/EditableSpan';
import {useActions} from '../../hooks/useActions';
import {PhotoCamera} from '@material-ui/icons';

const ProfileInfo = () => {
    const user = useAppSelector(state => state.auth.user);
    const packs = useAppSelector(state => state.packs.packs);
    const myPacks = packs.filter(p => p.user_id === user._id);
    const {updateProfile} = useActions();
    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.background.paper}`,
    }));
    const Input = styled('input')({
        display: 'none',
    });
    const BigAvatar = styled(Avatar)(({theme}) => ({
        width: 200,
        height: 200
    }));
    const [avatarUrl, setAvatarUrl]  = useState<string>('');
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAvatarUrl(e.currentTarget.value);
        updateProfile(avatarUrl);
    }
    return (
        <Paper className={s.profile}>
            <h3>Personal Information</h3>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                    <label htmlFor="icon-button-file">
                        <Input id="icon-button-file" type="file" onChange={onChangeHandler}/>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                }
            >
                <BigAvatar alt="profile avatar" src={user.avatar}/>
            </Badge>
            <EditableSpan value={user.name} onChange={(newValue: string) => updateProfile(newValue)}/>
            <div>
                <div style={{height: 50, textAlign: 'center', background:'bisque'}}>
                    <LayersIcon/> My Packs: {myPacks.length}
                </div>
            </div>
        </Paper>
    );
};

export default ProfileInfo;
