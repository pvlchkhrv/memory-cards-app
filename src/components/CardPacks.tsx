import React from 'react'
import {Button, Container, Grid, LinearProgress, Paper, TextField} from '@material-ui/core'
import s from './CardPacks.module.css'
import {GetPacksQueryParamsType, PackType} from '../types/packsTypes'
import {UserDataType} from '../types/authTypes'
import {DataTable} from './DataTable'
import {RequestStatusType} from '../types/appTypes'
import PaginationBar from './PaginationBar'

type CardsPacksPropsType = {
    packs: PackType []
    packsTotal: number
    queryParams: GetPacksQueryParamsType
    user: UserDataType | null
    getPacks: (id?: string) => void
    status: RequestStatusType
    isMine: boolean
    handlePageChange: (e: React.ChangeEvent<unknown>, value: number) => void
    handlePageCountChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const CardPacks: React.FC<CardsPacksPropsType> = ({
                                                      queryParams,
                                                      user,
                                                      status,
                                                      getPacks,
                                                      isMine,
                                                      handlePageChange,
                                                      handlePageCountChange,
                                                      packs,
                                                      packsTotal
                                                  }) => {
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
                            >Add Pack</Button>
                        </div>
                        <DataTable packs={packs}
                                   userId={user?._id}
                        />
                        <PaginationBar page={queryParams.page}
                                       pageCount={queryParams.pageCount}
                                       packsTotal={packsTotal}
                                       handlePageChange={handlePageChange}
                                       handlePageCountChange={handlePageCountChange}


                        />
                    </Grid>
                </Grid>
            </Paper>
            {status === 'loading' && <LinearProgress/>}
        </Container>
    );
};

export default CardPacks;
