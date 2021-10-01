import {Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
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
}

export const PacksTable: FC<PackTablePropsType> = ({
                                                       packs,
                                                       userId,
                                                       onDeleteClick,
                                                       onEditClick,
                                                   }) => {
    const columnTitles = [
        {id: 1, title: 'Pack name'},
        {id: 2, title: 'Cards'},
        {id: 3, title: "Last updated"},
        {id: 4, title: "Created"},
        {id: 5, title: "Actions"}
    ]
    const [modal, setModal] = useState<boolean>(false);
    const history = useHistory();
    return (
        <Table>
            <TableHead className={s.tableHead}>
                <TableRow>
                    {columnTitles.map(t => {
                        if (t.title === 'Pack name') {
                            return <TableCell key={t.id}>{t.title}</TableCell>
                        }
                        return <TableCell key={t.id} align='center'>{t.title}</TableCell>
                    })}
                </TableRow>
            </TableHead>
            {!packs.length && <div className={s.noPacksMessage}>No packs has been found...</div>}
            <TableBody>
                {packs.map((pack) => (
                    <TableRow key={pack._id}>
                        <TableCell component='th' scope='row'>
                            <NavLink to={RouteNames.PACKS + `/${pack._id}`}
                            >{pack.name}</NavLink>
                        </TableCell>
                        <TableCell align='center'>{pack.cardsCount}</TableCell>
                        <TableCell align='center'>{formatDate(new Date(pack.updated))}</TableCell>
                        <TableCell align='center'>{formatDate(new Date(pack.created))}</TableCell>
                        {
                            userId === pack.user_id
                                ? <TableCell align='center' className={s.actionCell}>
                                    <Button onClick={() => setModal(true)}>Edit</Button>
                                    <Button onClick={() => history.push('/learn/' + pack._id)}
                                    >Learn</Button>
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
                                </TableCell>
                                :
                                <TableCell align='center' className={s.actionCell}>
                                    <Button onClick={() => history.push('/learn/' + pack._id)}>Learn</Button>
                                </TableCell>

                        }
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
