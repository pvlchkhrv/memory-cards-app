import React, {useEffect, useState} from 'react'
import CardPacks from './CardPacks'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../store'
import {fetchPacks} from '../store/reducers/packsReducer'

const CardPacksContainer = () => {
    const [isMine, setIsMine] = useState(false)
    const dispatch = useDispatch()
    const status = useAppSelector(state => state.app.status)
    const {user} = useAppSelector(state => state.auth)
    const packsData = useAppSelector(state => state.packs)

    const getPacks = (id?: string) => {
        if (id) {
            dispatch(fetchPacks({user_id: id}))
            setIsMine(true)
        } else {
            dispatch(fetchPacks({}))
            setIsMine(false)
        }
    }

    useEffect(() => {
        dispatch(fetchPacks({pageCount: 10}))
    }, [])

    return (
        <CardPacks packsData={packsData}
                   user={user}
                   getPacks={getPacks}
                   status={status}
                   isMine={isMine}
        />
    )
}

export default CardPacksContainer;
