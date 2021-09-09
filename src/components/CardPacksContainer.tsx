import React, {ChangeEvent, useEffect, useState} from 'react';
import CardPacks from './CardPacks';
import {useDispatch} from 'react-redux';
import {addPack, fetchPacks, removePack, setPage, setPageCount, updatePack} from '../store/reducers/packs/packsReducer';
import {Redirect} from 'react-router';
import {PackPayloadType} from '../types/packsTypes';
import {useAppSelector} from '../hooks/useAppSelector';
import {useActions} from '../hooks/useActions';

const CardPacksContainer = () => {
    const [isMine, setIsMine] = useState(false);
    const [newPackTitle, setNewPackTitle] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');

    const dispatch = useDispatch();
    const status = useAppSelector(state => state.app.status);
    const {user} = useAppSelector(state => state.auth);
    let {
        packs, cardPacksTotalCount, page, pageCount,
        maxCardsCount, minCardsCount
    } = useAppSelector(state => state.packs);
    const queryParams = {page, pageCount, maxCardsCount, minCardsCount};
    const {authMe} = useActions();

    const getPacks = (id?: string, filter?: string) => {
        if (id) {
            dispatch(fetchPacks({...queryParams, user_id: id, packName: filter}))
        } else {
            dispatch(fetchPacks({...queryParams, packName: filter}))
        }
    }
    const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => dispatch(setPage(value))
    const handlePageCountChange = (e: ChangeEvent<HTMLSelectElement>) => dispatch(setPageCount(+e.currentTarget.value))
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.currentTarget.value)
    }
    const handleCreatePack = async (title: string) => {
        await dispatch(addPack({name: title}))
        isMine
            ? getPacks(user?._id)
            : getPacks()
    }
    const handleDeletePack = async (id: string) => {
        await dispatch(removePack(id))
        isMine
            ? getPacks(user?._id)
            : getPacks()
    }
    const handleEditPack = async (payload: PackPayloadType) => {
        await dispatch(updatePack({name: payload.name, _id: payload._id}))
        isMine
            ? getPacks(user?._id)
            : getPacks()
    }
    useEffect(() => {
        authMe();
    }, []);

    useEffect(() => {
        if (isMine) {
            getPacks(user?._id, filter)
        } else {
            getPacks(filter)
        }
    }, [dispatch, page, isMine, pageCount])

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
