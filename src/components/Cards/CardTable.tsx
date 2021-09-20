import React, {FC} from 'react';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import s from '../Packs/PacksTable.module.css';
import {NavLink} from 'react-router-dom';
import {RouteNames} from '../../router';
import {formatDate} from '../../utils/date';
import {ICard} from '../../models/ICard';

type CardTablePropsType = {
    cards: ICard[]
}

const CardTable: FC<CardTablePropsType> = ({cards}) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label='card table'>
                <TableHead className={s.tableHead}>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align='center'>Question</TableCell>
                        <TableCell align='center'>Answer</TableCell>
                        <TableCell align='center'>Last Updated</TableCell>
                        <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards.map((card) => (
                        <TableRow key={card._id}>
                            <TableCell component='th' scope='row'>
                                <NavLink to={RouteNames.PACKS + `/${card._id}`}>{card.question}</NavLink>
                            </TableCell>
                            <TableCell align='center'>{card.answer}</TableCell>
                            <TableCell align='center'>{formatDate (new Date(card.updated))}</TableCell>
                            <TableCell align='center'>
                                <div>
                                    <Button onClick={() => {}}>Edit</Button>
                                    <Button onClick={() => {}}
                                            color='secondary'
                                    >Delete</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CardTable;
