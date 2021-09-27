import React, {ChangeEvent, useEffect, useState} from 'react';
import {PacksList} from './PacksList/PacksList';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useActions} from '../../hooks/useActions';
import {PackPayload} from '../../store/reducers/packs/types';
import {AsideBar} from './AsideBar/AsideBar';
import {Grid, Paper} from '@material-ui/core';
import s from './PacksList/PacksList.module.css';

const PacksContainer = () => {
    const [isMine, setIsMine] = useState(false);
    const [newPackTitle, setNewPackTitle] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');

    const status = useAppSelector(state => state.app.status);
    const user = useAppSelector(state => state.auth.user);
    const {packs, cardPacksTotalCount, page, pageCount, maxCardsCount, minCardsCount} =
        useAppSelector(state => state.packs);
    const queryParams = {page, pageCount, maxCardsCount, minCardsCount};
    const {fetchPacks, setPage, setPageCount, addPack, removePack, updatePack} = useActions();

    const getPacks = (isMine: boolean, id?: string, filter?: string) => {
        if (isMine && id) {
            fetchPacks({...queryParams, user_id: id, packName: filter});
        } else {
            fetchPacks({...queryParams, packName: filter});
        }
    };
    const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => setPage(value);
    const handlePageCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPageCount(+e.currentTarget.value);
    }
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.currentTarget.value);
    };
    const handleOnSearchClick = () => getPacks(isMine, user._id, filter);
    const handleCreatePack = async (title: string) => {
        await addPack({name: title});
        getPacks(isMine, user._id, filter);
    };
    const handleDeletePack = async (id: string) => {
        await removePack(id);
        getPacks(isMine, user._id, filter);
    };
    const handleEditPack = async (payload: PackPayload) => {
        await updatePack({name: payload.name, _id: payload._id})
        getPacks(isMine, user._id, filter);
    };

    useEffect(() => {
        getPacks(isMine, user._id, filter);
    }, [page, isMine, pageCount]);

    return (
        <Paper className={s.packs}>
            <Grid container className={s.grid}>
                <AsideBar isMine={isMine} setIsMine={setIsMine}/>
                <PacksList packs={packs}
                           packsTotal={cardPacksTotalCount}
                           queryParams={queryParams}
                           user={user}
                           status={status}
                           isMine={isMine}
                           handlePageChange={handlePageChange}
                           handlePageCountChange={handlePageCountChange}
                           handleSearch={handleSearch}
                           onSearchClick={handleOnSearchClick}
                           handleCreatePack={handleCreatePack}
                           handleEditPack={handleEditPack}
                           handleDeletePack={handleDeletePack}
                           newPackTitle={newPackTitle}
                           setNewPackTitle={setNewPackTitle}
                           setIsMine={setIsMine}
                           filter={filter}
                           visible={visible}
                           setVisible={setVisible}
                />
            </Grid>
        </Paper>

    )
}

export default PacksContainer;
