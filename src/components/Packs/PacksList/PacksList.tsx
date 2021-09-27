import React, {ChangeEvent, FC} from 'react'
import {Grid} from '@material-ui/core'
import s from './PacksList.module.css'
import {RequestStatusType} from '../../../store/reducers/app/types'
import PaginationBar from '../../Pagination/PaginationBar'
import {IPack} from '../../../models/IPack';
import {IUser} from '../../../models/IUser';
import {GetPacksQueryParams, PackPayload} from '../../../store/reducers/packs/types';
import {PacksTable} from './PacksTable';
import SearchBar from '../../Search/SearchBar';

type PacksListProps = {
    packs: IPack[];
    packsTotal: number;
    queryParams: GetPacksQueryParams;
    user: IUser;
    status: RequestStatusType;
    isMine: boolean;
    handlePageChange: (e: React.ChangeEvent<unknown>, value: number) => void;
    handlePageCountChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleCreatePack: (title: string) => void;
    handleDeletePack: (id: string) => void;
    handleEditPack: (payload: PackPayload) => void;
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    newPackTitle: string;
    setNewPackTitle: (newPackTitle: string) => void;
    setIsMine: (isMine: boolean) => void;
    filter: string;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onSearchClick: () => void;

}

export const PacksList: FC<PacksListProps> = ({
                                                  queryParams,
                                                  user,
                                                  status,
                                                  handlePageChange,
                                                  handlePageCountChange,
                                                  handleCreatePack,
                                                  handleSearch,
                                                  handleDeletePack,
                                                  handleEditPack,
                                                  packs,
                                                  packsTotal,
                                                  filter,
                                                  visible,
                                                  setVisible,
                                                  onSearchClick
                                              }) => {

    return (
        <Grid item xs={9} className={s.packList}>
            <h3>Packs List ({packsTotal})</h3>
            <SearchBar
                filter={filter}
                visible={visible}
                setVisible={setVisible}
                onSearchClick={onSearchClick}
                handleSearch={handleSearch}
                handleCreatePack={handleCreatePack}
            />
            <PacksTable packs={packs}
                        userId={user?._id}
                        onDeleteClick={handleDeletePack}
                        onEditClick={handleEditPack}
                        visible={visible}
                        setVisible={setVisible}
            />
            <PaginationBar page={queryParams.page}
                           pageCount={queryParams.pageCount}
                           packsTotal={packsTotal}
                           handlePageChange={handlePageChange}
                           handlePageCountChange={handlePageCountChange}
                           status={status}
            />
        </Grid>
    );
};



