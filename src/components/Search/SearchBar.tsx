import React, {ChangeEvent, FC} from 'react';
import s from '../Packs/PacksList/PacksList.module.css';
import {Button, TextField} from '@material-ui/core';
import Modal from '../modals/Modal';
import AddNewItemForm from '../forms/add-new-item-form/AddNewItemForm';
import {useAppSelector} from '../../hooks/useAppSelector';
import {Search} from '@material-ui/icons';

type SearchProps = {
    filter: string;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onSearchClick: () => void;
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    handleCreatePack: (title: string) => void;
}

export const SearchBar: FC<SearchProps> = ({
                                            filter,
                                            onSearchClick,
                                            setVisible,
                                            visible,
                                            handleSearch,
                                            handleCreatePack
                                        }) => {

    const status = useAppSelector(state => state.app.status);
    return (
        <div className={s.searchBar}>
            <TextField id='standard-search'
                       label='SearchBar'
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
    );
};

export default SearchBar;
