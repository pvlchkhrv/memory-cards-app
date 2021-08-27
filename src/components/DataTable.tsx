import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import {PackType} from '../types/packsTypes'
import {Link} from 'react-router-dom'
import {PACKS_URL} from '../api/packsAPI'
import s from './DataTable.module.css'

type DataTablePropsType = {
    packs: PackType []
    // deletePackHandler: (packId: string) => void
    // editPackHandler: (packId: string, title: string) => void
    userId?: string
}

export const DataTable: React.FC<DataTablePropsType> = ({
                                                            packs,
                                                            userId
                                                        }) => {
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
                                <TableCell align='center'>{new Date(pack.updated).toLocaleString()}</TableCell>
                                <TableCell align='center'>{new Date(pack.created).toLocaleString()}</TableCell>
                                <TableCell align='center'>
                                    {
                                        userId === pack.user_id
                                            ? <div>
                                                <Button>Delete</Button>
                                                <Button>Edit</Button>
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
