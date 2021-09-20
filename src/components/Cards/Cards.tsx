import React, {useEffect, useState} from 'react';
import {Button, Container, Paper, TextField} from '@material-ui/core';
import s from '../Packs/Packs.module.css';
import {Search} from '@material-ui/icons';
import Modal from '../modals/Modal';
import AddNewItemForm from '../forms/add-new-item-form/AddNewItemForm';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useActions} from '../../hooks/useActions';
import {useParams} from 'react-router';
import CardTable from './CardTable';

const Cards = () => {
    const [filter, setFilter] = useState<string>('');
    const {cardsTotalCount, cards} = useAppSelector(state => state.cards);
    const {packs} = useAppSelector(state => state.packs);
    const {status} = useAppSelector(state => state.app);
    const {isAuth} = useAppSelector(state => state.auth);
    const {fetchCards, addCard, authMe} = useActions();
    const {id} = useParams<{ id: string }>();
    let packName;
    packs.forEach(p => {
        if (p._id === id) {
            packName = p.name
        }
    })

    const onSearchClick = () => {
        fetchCards({cardsPack_id: id});
    };
    const handleCreateCard = async (title: string) => {
        await addCard({cardsPack_id: id});
        fetchCards({cardsPack_id: id});
    };

    useEffect(() => {
        if (!isAuth) {
            authMe();
        }
        fetchCards({cardsPack_id: id});
    },[])

    return (
        <Container>
            <Paper>
                <h3>{`${packName} (${cardsTotalCount})`}</h3>
                <div className={s.searchBar}>
                    <TextField id='standard-search'
                               label='Search'
                               type='search'
                               variant='outlined'
                               size='small'
                               value={filter}
                               onChange={e => setFilter(e.currentTarget.value)}
                    />
                    <Button onClick={onSearchClick}
                            color='primary'
                            variant={'outlined'}
                            className={s.searchButton}
                    ><Search/></Button>
                    <Button variant='contained'
                            color='primary'
                            size='large'
                            onClick={() => {
                            }}
                            disabled={status === 'loading'}
                    >Add Pack</Button>
                    <Modal visible={false}
                           setVisible={() => {
                           }}
                    >
                        <AddNewItemForm buttonTitle='Create card'
                                        onClick={handleCreateCard}
                                        setVisible={() => {
                                        }}
                        />
                    </Modal>
                </div>
                <CardTable cards={cards}/>
            </Paper>
        </Container>
    );
};

export default Cards;
