import React, {ChangeEvent, FC, useState} from 'react';
import s from '../Packs/PacksList/PacksList.module.css';
import {Button, TextField} from '@material-ui/core';
import Modal from '../modals/Modal';
import AddNewItemForm from '../forms/add-new-item-form/AddNewItemForm';
import {useAppSelector} from '../../hooks/useAppSelector';
import {Search} from '@material-ui/icons';
import {useDebounce} from '../../hooks/useDebounce';

// type SearchProps = {
//     filter: string;
//     onSearchClick: () => void;
//     handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
//     handleCreatePack: (title: string) => void;
// }

type SearchProps = {
    type: 'cards' | 'packs';
    filter: string;
    setFilter: (filter: string) => void;
    onSearch: () => void;
    onCreate: (title: string) => void;
}


export const SearchBar: FC<SearchProps> = ({
                                               type,
                                               onSearch,
                                               onCreate,
                                               filter,
                                               setFilter
                                           }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const handleDebouncedSearch = useDebounce(onSearch, 1000);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.currentTarget.value);
        handleDebouncedSearch();
    };

    const status = useAppSelector(state => state.app.status);
    return (
        <div className={s.searchBar}>
            <div>
                <TextField id='standard-search'
                           label={type === 'packs'
                               ? 'Pack title...'
                               : 'Question or Answer ...'
                           }
                           type='search'
                           size='small'
                           value={filter}
                           onChange={onChange}
                />
            </div>
            <Button color='primary'
                    onClick={() => setVisible(true)}
                    disabled={status === 'loading'}
            >{type === 'packs' ? 'Create Pack' : 'Create Card'}</Button>
            <Modal visible={visible}
                   setVisible={setVisible}
            >
                <AddNewItemForm buttonTitle={type === 'packs'
                    ? 'Add pack'
                    : 'Add card'}
                                onClick={onCreate}
                                setVisible={setVisible}
                />
            </Modal>
        </div>
    );
};

export default SearchBar;
