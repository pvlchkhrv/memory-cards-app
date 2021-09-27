import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import {NavLink} from 'react-router-dom'
import s from './PacksTable.module.css'
import {useHistory} from 'react-router';
import {IPack} from '../../../models/IPack';
import {PackPayload} from '../../../store/reducers/packs/types';
import {FC, useState} from 'react';
import {formatDate} from '../../../utils/date';
import EditItemForm from '../../forms/edit-item-form/EditItemForm';
import {RouteNames} from '../../../router';
import Modal from '../../modals/Modal';

type PackTablePropsType = {
    packs: IPack[];
    userId?: string;
    onDeleteClick: (id: string) => void;
    onEditClick: (payload: PackPayload) => void;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export const PacksTable: FC<PackTablePropsType> = ({
                                                       packs,
                                                       userId,
                                                       onDeleteClick,
                                                       onEditClick,
                                                   }) => {
    const [modal, setModal] = useState<boolean>(false);
    const history = useHistory();
    return (
        <Table aria-label='simple table'>
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
                            <NavLink to={RouteNames.PACKS + `/${pack._id}`}>{pack.name}</NavLink>
                        </TableCell>
                        <TableCell align='center'>{pack.cardsCount}</TableCell>
                        <TableCell align='center'>{formatDate(new Date(pack.updated))}</TableCell>
                        <TableCell align='center'>{formatDate(new Date(pack.created))}</TableCell>
                        <TableCell align='center'>
                            {
                                userId === pack.user_id
                                    ? <div>
                                        <Button onClick={() => {
                                        }}
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
                                    : <Button onClick={() => history.push('/learn/' + pack._id)}>Learn</Button>
                            }
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
