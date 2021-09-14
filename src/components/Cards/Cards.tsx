import React from 'react';
import {Button, Container, Paper, TextField} from '@material-ui/core';
import s from '../components/Packs/CardPacks.module.css';
import {Search} from '@material-ui/icons';
import Modal from '../components/modals/Modal';
import AddNewItemForm from '../components/forms/add-new-item-form/AddNewItemForm';
import {useAppSelector} from '../hooks/useAppSelector';

const Cards = () => {
    const {cardsTotalCount} = useAppSelector(state => state.cards);

    return (
        <Container>
            <Paper>
                <h3>Cards List ({cardsTotalCount})</h3>
                <div className={s.searchBar}>
                    <TextField id='standard-search'
                               label='Search'
                               type='search'
                               variant='outlined'
                               size='small'
                               value={filter}
                               onChange={handleSearch}
                    />
                    <Button onClick={onSearchClick}
                            color='primary'
                            variant={'outlined'}
                            className={s.searchButton}
                    ><Search/></Button>
                    <Button variant='contained'
                            color='primary'
                            size='large'
                            onClick={() => setVisible(true)}
                            disabled={status === 'loading'}
                    >Add Pack</Button>
                    <Modal visible={visible}
                           setVisible={setVisible}
                    >
                        <AddNewItemForm buttonTitle='Create pack'
                                        onClick={handleCreatePack}
                                        setVisible={setVisible}
                        />
                    </Modal>
                </div>
            </Paper>
        </Container>
    );
};

export default Cards;
