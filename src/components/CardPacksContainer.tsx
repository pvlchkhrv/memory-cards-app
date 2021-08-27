import React, {ChangeEvent, useEffect, useState} from 'react'
import CardPacks from './CardPacks'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../store'
import {fetchPacks, setPage, setPageCount} from '../store/reducers/packsReducer'

const CardPacksContainer = () => {
    const [isMine, setIsMine] = useState(false)
    const [newPackTitle, setNewPackTitle] = useState('')
    const dispatch = useDispatch()
    const status = useAppSelector(state => state.app.status)
    const {user} = useAppSelector(state => state.auth)
    const {
        packs, cardPacksTotalCount, page, pageCount,
        maxCardsCount, minCardsCount
    } = useAppSelector(state => state.packs)
    const queryParams = {page, pageCount, maxCardsCount, minCardsCount}

    const getPacks = (id?: string) => {
        if (id) {
            dispatch(fetchPacks({...queryParams, user_id: id}))
            setIsMine(true)
        } else {
            dispatch(fetchPacks({...queryParams}))
            setIsMine(false)
        }
    }
    const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => dispatch(setPage(value))
    const handlePageCountChange = (e: ChangeEvent<HTMLSelectElement>) => dispatch(setPageCount(+e.currentTarget.value))
    // const hendleNewPackAdd = () => dispatch()

    useEffect(() => {
        if (isMine) {
            getPacks(user?._id)
        } else {
            getPacks()
        }
    }, [page, pageCount, isMine])

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
                   // newPackTitle={newPackTitle}
                   // setNewPackTitle

        />
    )
}

export default CardPacksContainer;
