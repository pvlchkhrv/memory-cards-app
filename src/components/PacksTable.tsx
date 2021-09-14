import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {PACKS_URL} from '../api/packsAPI'
import s from './DataTable.module.css'
import Modal from './modals/Modal';
import EditItemForm from './forms/edit-item-form/EditItemForm';
import {FC, useState} from 'react';
import {IPack} from '../models/IPack';
import {formatDate} from '../utils/date';
import {PackPayload} from '../store/reducers/packs/types';

type DataTablePropsType = {
    packs: IPack[];
    userId?: string;
    onDeleteClick: (id: string) => void;
    onEditClick: (payload: PackPayload) => void;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export const DataTable: FC<DataTablePropsType> = ({
                                                      packs,
                                                      userId,
                                                      onDeleteClick,
                                                      onEditClick,
                                                  }) => {
    const [modal, setModal] = useState<boolean>(false);
    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={'classes.table'} aria-label='simple table'>
                    <TableHead className={s.tableHead}>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align='center'>Cards</TableCell>
                            <TableCell align='center'>Updated</TableCell>
                            <TableCell align='center'>Created</TableCell>
                            <TableCell align='center'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packs.map((pack) => (
                            <TableRow key={pack._id}>
                                <TableCell component='th' scope='row'>
                                    <Link to={PACKS_URL + `/${pack._id}`}>{pack.name}</Link>
                                </TableCell>
                                <TableCell align='center'>{pack.cardsCount}</TableCell>
                                <TableCell align='center'>{formatDate(new Date(pack.updated))}</TableCell>
                                <TableCell align='center'>{formatDate(new Date(pack.created))}</TableCell>
                                <TableCell align='center'>
                                    {
                                        userId === pack.user_id
                                            ? <div>
                                                <Button onClick={() => {}}
                                                >Learn</Button>
                                                <Button onClick={() => setModal(true)}>Edit</Button>
                                                <Modal visible={modal} setVisible={setModal}>
                                                    <EditItemForm onEditClick={onEditClick}
                                                                  buttonTitle='Update pack'
                                                                  setVisible={setModal}
                                                                  pack_id={pack._id}
                                                                  name={pack.name}
                                                    />
                                                </Modal>
                                                <Button onClick={() => onDeleteClick(pack._id)}
                                                        color='secondary'
                                                >Delete</Button>

                                            </div>

                                            : <Button onClick={() => {
                                            }}>Learn</Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
