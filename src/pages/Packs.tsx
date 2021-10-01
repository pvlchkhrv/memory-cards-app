import React from 'react'
import {Grid, Paper} from '@material-ui/core';
import {AsideBar} from '../components/Packs/AsideBar/AsideBar';
import {PacksList} from '../components/Packs/PacksList/PacksList';

const Packs = () => {
    console.log("PACKS");
    return (
        <Paper className='packs'>
            <Grid container>
                <AsideBar/>
                <PacksList />
            </Grid>
        </Paper>
    );
}

export default Packs;
