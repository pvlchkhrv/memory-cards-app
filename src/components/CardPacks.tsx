import React, {useState} from 'react'
import {Button, Container, Grid, LinearProgress, Paper, TextField} from '@material-ui/core'
import s from './CardPacks.module.css'
import {PacksStateType} from '../types/packsTypes';
import {UserDataType} from '../types/authTypes';
import {DataTable} from './DataTable';
import {RequestStatusType} from '../types/appTypes';

type CardsPacksPropsType = {
    packsData: PacksStateType
    user: UserDataType | null
    getPacks: (id?: string) => void
    status: RequestStatusType
    isMine: boolean
}

const CardPacks: React.FC<CardsPacksPropsType> = ({packsData, user, status, getPacks, isMine}) => {
    return (
        <Container fixed className={s.container}>
            <Paper>
                <Grid container className={s.content}>
                    <Grid item xs={3} className={s.settings}>
                        <div>
                            <h5>Show Card Packs</h5>
                            {
                                isMine
                                    ? <Button
                                        color='secondary'
                                        variant='contained'
                                        disabled={status === 'loading'}
                                        onClick={() => getPacks()}
                                    >Show All Packs</Button>
                                    : <Button color='primary'
                                              variant='contained'
                                              disabled={status === 'loading'}
                                              onClick={() => getPacks(user?._id)}
                                    >Show My Packs</Button>
                            }
                        </div>
                        <div>
                            <h5>Number Of Cards</h5>
                            {/*<DoubleSlider/>*/}
                        </div>
                    </Grid>
                    <Grid item xs={9} className={s.packList}>
                        <h3>Packs List</h3>
                        <div className={s.searchBar}>
                            <TextField id='standard-search'
                                       label='Search'
                                       type='search'
                                       variant={'outlined'}
                                       size={'small'}
                            />
                            <Button variant={'contained'}
                                    color={'primary'}
                                    size={'large'}
                            >Add New Pack</Button>
                        </div>
                        <DataTable packs={packsData.packs}
                                   userId={user?._id}
                        />
                        {/*<PaginationBar pages={pages}*/}
                        {/*               page={page}*/}
                        {/*               pageCount={pageCount}*/}
                        {/*               onChangePage={onChangePage}*/}
                        {/*               onChangeItemsQuantity={onChangeItemsQuantity}*/}
                        {/*/>*/}
                    </Grid>
                </Grid>
            </Paper>
            {status === 'loading' && <LinearProgress/>}
        </Container>
    );
};

export default CardPacks;
