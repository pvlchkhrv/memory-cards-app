import React, {FC} from 'react';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import s from '../Packs/PacksList/PacksList.module.css'
import {NavLink} from 'react-router-dom';
import {RouteNames} from '../../router';
import {formatDate} from '../../utils/date';
import {ICard} from '../../models/ICard';
import CardRating from './CardRating';

type CardTablePropsType = {
    cards: ICard[]
}

const CardTable: FC<CardTablePropsType> = ({cards}) => {
    const columnTitles = [
        {id: 1, title: 'Question'},
        {id: 2, title: 'Answer'},
        {id: 3, title: "Last updated"},
        {id: 4, title: "Grade"},
        {id: 5, title: "Actions"}
    ]
    return (
            <Table aria-label='card table'>
                <TableHead className={s.tableHead} style={{backgroundColor: '#ECECF9'}}>
                    <TableRow>
                        {columnTitles.map(t => {
                            return <TableCell key={t.id} align='center'>{t.title}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards.map(card => (
                        <TableRow key={card._id}>
                            <TableCell align='center' width={300}>{card.question}</TableCell>
                            <TableCell align='center' width={300}>{card.answer}</TableCell>
                            <TableCell align='center' >{formatDate (new Date(card.updated))}</TableCell>
                            <TableCell align='center' width={100}>
                                <CardRating grade={card.grade}/>
                            </TableCell>
                            <TableCell align='center' width={150}>
                                    <Button onClick={() => {}}>Edit</Button>
                                    <Button onClick={() => {}}
                                            color='secondary'
                                    >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
    );
};

export default CardTable;
