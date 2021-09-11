import React, {ChangeEvent} from 'react'
import {Button, Container, Grid, LinearProgress, Paper, TextField} from '@material-ui/core'
import s from './CardPacks.module.css'
import {DataTable} from './DataTable'
import {RequestStatusType} from '../store/reducers/app/types'
import PaginationBar from './PaginationBar'
import AddPackModal from './modals/AddPackModal';
import AddNewItemForm from './forms/add-new-item-form/AddNewItemForm';
import {IPack} from '../models/IPack';
import {IUser} from '../models/IUser';
import {GetPacksQueryParams, PackPayload} from '../store/reducers/packs/types';

type CardsPacksPropsType = {
    packs: IPack []
    packsTotal: number
    queryParams: GetPacksQueryParams
    user: IUser
    getPacks: (id?: string) => void
    status: RequestStatusType
    isMine: boolean
    handlePageChange: (e: React.ChangeEvent<unknown>, value: number) => void
    handlePageCountChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    handleCreatePack: (title: string) => void
    handleDeletePack: (id: string) => void
    handleEditPack: (payload: PackPayload) => void
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
                                                      isMine,
                                                      setIsMine,
                                                      handlePageChange,
                                                      handlePageCountChange,
                                                      handleCreatePack,
                                                      handleSearch,
                                                      handleDeletePack,
                                                      handleEditPack,
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
                                       variant='outlined'
                                       size='small'
                                       value={filter}
                                       onChange={handleSearch}
                            />
                            <Button variant='contained'
                                    color='primary'
                                    size='large'
                                    onClick={() => setVisible(true)}
                                    disabled={status === 'loading'}
                            >Add Pack</Button>
                            <AddPackModal visible={visible}
                                          setVisible={setVisible}
                            >
                                <AddNewItemForm buttonTitle='Create pack'
                                                onClick={handleCreatePack}
                                                setVisible={setVisible}
                                />
                            </AddPackModal>
                        </div>
                        <DataTable packs={packs}
                                   userId={user?._id}
                                   onDeleteClick={handleDeletePack}
                                   onEditClick={handleEditPack}
                                   visible={visible}
                                   setVisible={setVisible}
                        />
                        <PaginationBar page={queryParams.page}
                                       pageCount={queryParams.pageCount}
                                       packsTotal={packsTotal}
                                       handlePageChange={handlePageChange}
                                       handlePageCountChange={handlePageCountChange}
                                       status={status}
                        />
                    </Grid>
                </Grid>
            </Paper>
            {status === 'loading' && <LinearProgress/>}
        </Container>
    );
};

export default CardPacks;
