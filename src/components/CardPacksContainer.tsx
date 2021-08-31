import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import CardPacks from './CardPacks'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../store'
import {addPack, fetchPacks, setPacks, setPage, setPageCount} from '../store/reducers/packsReducer'
import {Redirect} from 'react-router'

const CardPacksContainer = () => {
    const [isMine, setIsMine] = useState(false)
    const [newPackTitle, setNewPackTitle] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)
    const [filter, setFilter] = useState<string>('')
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

    const dispatch = useDispatch()
    const status = useAppSelector(state => state.app.status)
    const {user} = useAppSelector(state => state.auth)
    let {
        packs, cardPacksTotalCount, page, pageCount,
        maxCardsCount, minCardsCount
    } = useAppSelector(state => state.packs)
    const queryParams = {page, pageCount, maxCardsCount, minCardsCount}

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
        // if (timeoutId) {
        //     clearTimeout(timeoutId)
        // }
        // const newTimeoutId = setTimeout(() => {
        //     isMine
        //         ? dispatch(fetchPacks({...queryParams, user_id: user?._id, packName: filter}))
        //         : dispatch((fetchPacks({...queryParams, packName: filter})))
        //     if (!filter) {
        //         dispatch((fetchPacks({...queryParams})))
        //     }
        //     setTimeoutId(newTimeoutId)
        // },800)
    }
    const handleCreatePack = async (e: FormEvent<HTMLButtonElement>, title: string) => {
        await dispatch(addPack({name: title}))
        isMine
            ? getPacks(user?._id)
            : getPacks()
        setNewPackTitle('')
    }

    useEffect(() => {
        if (isMine) {
            getPacks(user?._id, filter)
        } else {
            getPacks(filter)
        }
    }, [dispatch, page, isMine, filter])

    if (user === null) {
        return <Redirect to={'/login'}/>
    }

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
