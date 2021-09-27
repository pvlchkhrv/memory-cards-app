import React from 'react';
import {Avatar, Badge, Paper} from '@material-ui/core';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const ProfileInfo = () => {
    return (
        <Paper>
            <h3>Personal Information</h3>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={4}
            >
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </Badge>

        </Paper>
    );
};

export default ProfileInfo;
