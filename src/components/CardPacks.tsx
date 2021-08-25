import React, {useState} from 'react'
import {Button, Container, Grid, TextField} from '@material-ui/core'
import s from './CardPacks.module.css'
import {PacksStateType} from '../types/packsTypes';
import {UserDataType} from '../types/authTypes';
import {DataTable} from './DataTable';

type CardsPacksPropsType = {
    packsData: PacksStateType
    user: UserDataType | null
}

const CardPacks: React.FC<CardsPacksPropsType> = ({packsData, user}) => {
    const [isMine, setIsMine] = useState(false)
    return (
        <Container fixed className={s.container}>
            <Grid container>
                <Grid item xs={3} className={s.settings}>
                    <div>
                        <h5>Show Card Packs</h5>
                        {
                            isMine
                                ? <Button
                                    color="secondary"
                                    variant='contained'
                                >Show All Packs</Button>
                                : <Button color="primary"
                                          variant='contained'
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
                    <div>
                        <TextField id="standard-search" label="Search" type="search" variant={'outlined'}
                                   size={'small'}/>
                        <Button variant={'contained'}
                                color={'secondary'}
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
        </Container>
    );
};

export default CardPacks;
