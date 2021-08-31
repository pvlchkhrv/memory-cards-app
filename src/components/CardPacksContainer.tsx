import React, {ChangeEvent, useEffect, useState} from 'react'
import CardPacks from './CardPacks'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../store'
import {fetchPacks, setPage, setPageCount} from '../store/reducers/packsReducer'
import {Redirect} from 'react-router';

const CardPacksContainer = () => {
    const [isMine, setIsMine] = useState(false)
    const [newPackTitle, setNewPackTitle] = useState<string>('')
    const [filter, setFilter] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)
    const dispatch = useDispatch()
    const status = useAppSelector(state => state.app.status)
    const {user} = useAppSelector(state => state.auth)
    let {
        packs, cardPacksTotalCount, page, pageCount,
        maxCardsCount, minCardsCount
    } = useAppSelector(state => state.packs)
    const queryParams = {page, pageCount, maxCardsCount, minCardsCount}
    const searchResults = !filter
        ? packs
        : packs.filter(p => p.name.toLowerCase().includes(p.name.toLocaleLowerCase()))
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
    const handleNewPackAddButton = () => {}
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.currentTarget.value)
        isMine && filter
            ? dispatch(fetchPacks({...queryParams, user_id: user?._id, packName: filter}))
            : dispatch((fetchPacks({...queryParams, packName: filter})))
        if (!filter) {
            dispatch((fetchPacks({...queryParams})))
        }
    }

    useEffect(() => {
        if (isMine) {
            dispatch(fetchPacks({...queryParams, user_id: user?._id}))
        } else {
            dispatch(fetchPacks({...queryParams}))
        }
    }, [page, pageCount, isMine])

    if (user === null) {
        return <Redirect to={'/login'}/>
    }
    return (
        <CardPacks packs={searchResults}
                   packsTotal={cardPacksTotalCount}
                   queryParams={queryParams}
                   user={user}
                   getPacks={getPacks}
                   status={status}
                   isMine={isMine}
                   handlePageChange={handlePageChange}
                   handlePageCountChange={handlePageCountChange}
                   handleNewPackAdd={handleNewPackAddButton}
                   handleSearch={handleSearch}
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
