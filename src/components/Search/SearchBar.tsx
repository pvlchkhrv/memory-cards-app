import React, {ChangeEvent, FC, useState} from 'react';
import s from '../Packs/PacksList/PacksList.module.css';
import {Button, TextField} from '@material-ui/core';
import Modal from '../modals/Modal';
import AddNewItemForm from '../forms/add-new-item-form/AddNewItemForm';
import {useAppSelector} from '../../hooks/useAppSelector';
import {Search} from '@material-ui/icons';

type SearchProps = {
    filter: string;
    onSearchClick: () => void;
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    handleCreatePack: (title: string) => void;
}

export const SearchBar: FC<SearchProps> = ({
                                               filter,
                                               onSearchClick,
                                               handleSearch,
                                               handleCreatePack
                                           }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const status = useAppSelector(state => state.app.status);
    return (
        <div className={s.searchBar}>
            <div>
                <TextField id='standard-search'
                           label='Pack title...'
                           type='search'
                           size='small'
                           value={filter}
                           onChange={handleSearch}
                />
                <Button onClick={onSearchClick}
                        color='primary'
                ><Search/></Button>
            </div>
            <Button color='primary'
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
