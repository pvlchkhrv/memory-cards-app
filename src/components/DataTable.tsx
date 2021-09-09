import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import {PackPayloadType} from '../types/packsTypes'
import {Link} from 'react-router-dom'
import {PACKS_URL} from '../api/packsAPI'
import s from './DataTable.module.css'
import MyModal from './common/modal/MyModal';
import EditItemForm from './forms/edit-item-form/EditItemForm';
import {useState} from 'react';
import {IPack} from '../models/IPack';
import {formatDate} from '../utils/date';

type DataTablePropsType = {
    packs: IPack []
    userId?: string
    onDeleteClick: (id: string) => void
    onEditClick: (payload: PackPayloadType) => void
    visible: boolean
    setVisible: (visible: boolean) => void
}

export const DataTable: React.FC<DataTablePropsType> = ({
                                                            packs,
                                                            userId,
                                                            onDeleteClick,
                                                            onEditClick,
                                                        }) => {
    const [modal, setModal] = useState<boolean>(false)
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
                                <TableCell align='center'>{new Date(pack.created).toLocaleString()}</TableCell>
                                <TableCell align='center'>
                                    {
                                        userId === pack.user_id
                                            ? <div>
                                                <Button onClick={() => onDeleteClick(pack._id)}>Delete</Button>
                                                <Button onClick={() => setModal(true)}>Edit</Button>
                                                <MyModal visible={modal} setVisible={setModal}>
                                                     <EditItemForm onEditClick={onEditClick}
                                                                   buttonTitle='Edit pack'
                                                                   setVisible={setModal}
                                                                   pack_id={pack._id}
                                                                   name={pack.name}
                                                     />
                                                </MyModal>
                                                <Button onClick={() => {
                                                }}>Learn</Button>
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
