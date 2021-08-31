import React, {ChangeEvent} from 'react'
import {Button, Container, Grid, LinearProgress, Paper, TextField} from '@material-ui/core'
import s from './CardPacks.module.css'
import {GetPacksQueryParamsType, PackType} from '../types/packsTypes'
import {UserDataType} from '../types/authTypes'
import {DataTable} from './DataTable'
import {RequestStatusType} from '../types/appTypes'
import PaginationBar from './PaginationBar'
import MyModal from './common/modal/MyModal';

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
    handleNewPackAdd: () => void
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
    newPackTitle: string
    setNewPackTitle: (newPackTitle: string) => void
    setIsMine: (isMine: boolean) => void
    filter: string
    visible: boolean
    setVisible: (visible: boolean) => void
}

const CardPacks: React.FC<CardsPacksPropsType> = ({
                                                      queryParams,
                                                      user,
                                                      status,
                                                      getPacks,
                                                      isMine,
                                                      setIsMine,
                                                      handlePageChange,
                                                      handlePageCountChange,
                                                      handleNewPackAdd,
                                                      newPackTitle,
                                                      setNewPackTitle,
                                                      handleSearch,
                                                      packs,
                                                      packsTotal,
                                                      filter,
                                                      visible,
                                                      setVisible
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
                                        onClick={() => setIsMine(false)}
                                    >Show All Packs</Button>
                                    : <Button color='primary'
                                              variant='contained'
                                              disabled={status === 'loading'}
                                              onClick={() => setIsMine(true)}
                                    >Show My Packs</Button>
                            }
                        </div>
                        <div>
                            <h5>Number Of Cards</h5>
                            {/*<DoubleSlider/>*/}
                        </div>
                    </Grid>
                    <Grid item xs={9} className={s.packList}>
                        <h3>Packs List ({packsTotal})</h3>
                        <div className={s.searchBar}>
                            <TextField id='standard-search'
                                       label='Search'
                                       type='search'
                                       variant={'outlined'}
                                       size={'small'}
                                       value={filter}
                                       onChange={handleSearch}
                            />
                            <Button variant={'contained'}
                                    color={'primary'}
                                    size={'large'}
                                    onClick={() => setVisible(true)}
                            >Add Pack</Button>
                            <MyModal visible={visible}
                                     setVisible={setVisible}
                            />
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
