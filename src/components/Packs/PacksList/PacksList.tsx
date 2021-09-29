import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {Grid} from '@material-ui/core'
import s from './PacksList.module.css'
import {RequestStatusType} from '../../../store/reducers/app/types'
import PaginationBar from '../../Pagination/PaginationBar'
import {IPack} from '../../../models/IPack';
import {IUser} from '../../../models/IUser';
import {GetPacksQueryParams, PackPayload} from '../../../store/reducers/packs/types';
import {PacksTable} from './PacksTable';
import SearchBar from '../../Search/SearchBar';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {useActions} from '../../../hooks/useActions';

export const PacksList: FC = () => {
    const [newPackTitle, setNewPackTitle] = useState<string>('');
    const [filter, setFilter] = useState<string>('');

    const {packs, cardPacksTotalCount, page, pageCount, maxCardsCount, minCardsCount} =
        useAppSelector(state => state.packs);
    const queryParams = {page, pageCount, maxCardsCount, minCardsCount};
    const status = useAppSelector(state => state.app.status);
    const user = useAppSelector(state => state.auth.user);
    const isMine = useAppSelector(state => state.packs.isMine);
    const {fetchPacks, setPage, setPageCount, addPack, removePack, updatePack, setIsMine} = useActions();

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
        <Grid item xs={9} className={s.packList}>
            <h3>Packs List ({cardPacksTotalCount})</h3>
            <SearchBar
                filter={filter}
                onSearchClick={handleOnSearchClick}
                handleSearch={handleSearch}
                handleCreatePack={handleCreatePack}
            />
            <PacksTable packs={packs}
                        userId={user?._id}
                        onDeleteClick={handleDeletePack}
                        onEditClick={handleEditPack}
            />
            {
                packs.length > 0 && <PaginationBar page={queryParams.page}
                                               pageCount={queryParams.pageCount}
                                               packsTotal={cardPacksTotalCount}
                                               handlePageChange={handlePageChange}
                                               handlePageCountChange={handlePageCountChange}
                                               status={status}
                />
            }
        </Grid>
    );
};



