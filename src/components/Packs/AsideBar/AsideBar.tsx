import React, {FC} from 'react';
import {Grid} from '@material-ui/core';
import s from './AsideBar.module.css';
import IsMineBlock from './isMineBlock';
import UserInfoBlock from './UserInfoBlock';
import SliderBlock from './SliderBlock';

export const AsideBar: FC = () => {
    console.log('ASIDE BAR')
    return (
        <Grid item xs={3} style={{backgroundColor: '#ECECF9'}}>
            <div className={s.settings}>
                <UserInfoBlock/>
                <IsMineBlock/>
                <SliderBlock/>
            </div>
        </Grid>
    );
};
