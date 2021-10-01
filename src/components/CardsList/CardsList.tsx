import React, {ChangeEvent, useEffect, useState} from 'react';
import {Paper} from '@material-ui/core';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useActions} from '../../hooks/useActions';
import {useParams} from 'react-router';
import CardTable from './CardTable';
import SearchBar from '../Search/SearchBar';
import s from './CardsList.module.css';
import PaginationBar from '../Pagination/PaginationBar';

const CardsList = () => {
    const [filter, setFilter] = useState<string>('');
    const {cardsTotalCount, cards, page, pageCount} = useAppSelector(state => state.cards);
    const packs = useAppSelector(state => state.packs.packs);
    const status = useAppSelector(state => state.app.status);
    const isAuth = useAppSelector(state => state.auth);
    const {fetchCards, addCard, setCardPage, setCardsPageCount} = useActions();
    const {id} = useParams<{ id: string }>();

    let packName;
    packs.forEach(p => {
        if (p._id === id) {
            packName = p.name
        }
    })

    const handleOnSearchClick = () => {
        fetchCards({cardsPack_id: id, cardQuestion: filter, cardAnswer: filter});
    };
    const handleCreateCard = async (title: string) => {
        await addCard({cardsPack_id: id});
        fetchCards({cardsPack_id: id});
    };
    const handlePageCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCardsPageCount(+e.currentTarget.value);
    };

    const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => setCardPage(value);
    useEffect(() => {
        fetchCards({cardsPack_id: id, page, pageCount});
    }, [page, pageCount]);

    return (
        <Paper className={s.cardList}>
            <h3>
                {`${packName} (${cardsTotalCount})`}
            </h3>
            <SearchBar onSearch={handleOnSearchClick}
                       type='cards'
                       onCreate={handleCreateCard}
                       filter={filter}
                       setFilter={setFilter}
            />
            <CardTable cards={cards}/>
            <PaginationBar pageCount={pageCount}
                           total={cardsTotalCount}
                           handlePageChange={handlePageChange}
                           handlePageCountChange={handlePageCountChange}
                           status={status}/>
        </Paper>
    );
};

export default CardsList;
