import React, {ChangeEvent, useEffect, useState} from 'react';
import CardPacks from './CardPacks';
import {Redirect} from 'react-router';
import {useAppSelector} from '../hooks/useAppSelector';
import {useActions} from '../hooks/useActions';
import {PackPayload} from '../store/reducers/packs/types';

const CardPacksContainer = () => {
    const [isMine, setIsMine] = useState(false);
    const [newPackTitle, setNewPackTitle] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');

    const status = useAppSelector(state => state.app.status);
    const {user} = useAppSelector(state => state.auth);
    const {packs, cardPacksTotalCount, page, pageCount, maxCardsCount, minCardsCount} =
        useAppSelector(state => state.packs);
    const queryParams = {page, pageCount, maxCardsCount, minCardsCount};
    const {authMe, fetchPacks, setPage, setPageCount, addPack, removePack, updatePack} = useActions();

    const getPacks = (id?: string, filter?: string) => {
        if (id) {
            fetchPacks({...queryParams, user_id: id, packName: filter});
        } else {
            fetchPacks({...queryParams, packName: filter});
        }
    };
    const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => setPage(value);
    const handlePageCountChange = (e: ChangeEvent<HTMLSelectElement>) => setPageCount(+e.currentTarget.value);
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.currentTarget.value);
    };
    const handleCreatePack = async (title: string) => {
        await addPack({name: title});
        isMine
            ? getPacks(user?._id)
            : getPacks();
    };
    const handleDeletePack = async (id: string) => {
        await removePack(id);
        isMine
            ? getPacks(user?._id)
            : getPacks();
    };
    const handleEditPack = async (payload: PackPayload) => {
        await updatePack({name: payload.name, _id: payload._id})
        isMine
            ? getPacks(user?._id)
            : getPacks()
    };

    useEffect(() => {
        if (isMine) {
            getPacks(user?._id, filter);
        } else {
            getPacks(filter);
        }
    }, [page, isMine, pageCount]);

    if ((Object.keys(user).length === 0)) return <Redirect to={'/login'}/>

    return (
        <CardPacks packs={packs}
                   packsTotal={cardPacksTotalCount}
                   queryParams={queryParams}
                   user={user}
                   getPacks={getPacks}
                   status={status}
                   isMine={isMine}
                   handlePageChange={handlePageChange}
                   handlePageCountChange={handlePageCountChange}
                   handleSearch={handleSearch}
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
    )
}

export default CardPacksContainer;
