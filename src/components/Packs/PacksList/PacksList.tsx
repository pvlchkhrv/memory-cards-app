import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {Grid} from '@material-ui/core'
import s from './PacksList.module.css'
import PaginationBar from '../../Pagination/PaginationBar'
import {PackPayload} from '../../../store/reducers/packs/types';
import {PacksTable} from './PacksTable';
import SearchBar from '../../Search/SearchBar';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {useActions} from '../../../hooks/useActions';
import {Redirect} from 'react-router';
import {RouteNames} from '../../../router';

export const PacksList: FC = () => {
    console.log('PACK LIST')
    const [filter, setFilter] = useState<string>('');

    const {packs, cardPacksTotalCount, page, pageCount, maxCardsCount, minCardsCount, isMine} =
        useAppSelector(state => state.packs);
    const queryParams = {page, pageCount,  min: minCardsCount, max: maxCardsCount, isMine, packName: filter};
    const status = useAppSelector(state => state.app.status);
    const {user,isAuth} = useAppSelector(state => state.auth);
    const {fetchPacks, setPage, setPageCount, addPack, removePack, updatePack} = useActions();

    const getPacks = () => {
        if (isMine && user._id) {
            fetchPacks({user_id: user._id, ...queryParams});
        } else {
            fetchPacks(queryParams);
        }
    };
    const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => setPage(value);
    const handlePageCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPageCount(+e.currentTarget.value);
    };
    const handleOnSearch = () => getPacks();
    const handleCreatePack = async (title: string) => {
        await addPack({name: title});
        getPacks();
    };
    const handleDeletePack = async (id: string) => {
        await removePack(id);
        getPacks();
    };
    const handleEditPack = async (payload: PackPayload) => {
        await updatePack({name: payload.name, _id: payload._id})
        getPacks();
    };

    useEffect(() => {
        getPacks();
    }, [page, isMine, pageCount, maxCardsCount, minCardsCount]);

    return (
        <Grid item xs={9} className={s.packList}>
            <h3>Packs List ({cardPacksTotalCount})</h3>
            <SearchBar
                type='packs'
                onSearch={handleOnSearch}
                onCreate={handleCreatePack}
                filter={filter}
                setFilter={setFilter}
            />
            <PacksTable packs={packs}
                        userId={user?._id}
                        onDeleteClick={handleDeletePack}
                        onEditClick={handleEditPack}
            />
            {
                packs.length > 0 && <PaginationBar page={queryParams.page}
                                               pageCount={queryParams.pageCount}
                                               total={cardPacksTotalCount}
                                               handlePageChange={handlePageChange}
                                               handlePageCountChange={handlePageCountChange}
                                               status={status}
                />
            }
        </Grid>
    );
};



