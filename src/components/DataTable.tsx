import * as PATH from 'path'
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import {PackType} from '../types/packsTypes'
import {Link} from 'react-router-dom'
import {PACKS_URL} from '../api/packsAPI';

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
                <Table className={'classes.table'} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Title</b></TableCell>
                            <TableCell align="center">Cards</TableCell>
                            <TableCell align="center">Updated</TableCell>
                            <TableCell align="center">Created</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packs.map((pack) => (
                            <TableRow key={pack._id}>
                                <TableCell component="th" scope="row">
                                    <Link to={PACKS_URL + `/${pack._id}`}>{pack.name}</Link>
                                </TableCell>
                                <TableCell align="center">{pack.cardsCount}</TableCell>
                                <TableCell align="center">{pack.updated}</TableCell>
                                <TableCell align="center">{pack.created}</TableCell>
                                <TableCell align="center">
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
