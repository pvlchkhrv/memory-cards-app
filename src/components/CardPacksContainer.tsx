import React, {useEffect} from 'react';
import CardPacks from './CardPacks';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../store';
import {fetchPacks} from '../store/reducers/packsReducer';

const CardPacksContainer = () => {
    const dispatch = useDispatch()
    const {user} = useAppSelector(state => state.auth)
    const packsData = useAppSelector(state => state.packs)

    useEffect(() => {
        dispatch(fetchPacks({}))
    }, [])

    return (
        <CardPacks packsData={packsData} user={user}/>
    )
}

export default CardPacksContainer;
