import React, {FC} from 'react';
import {Paper, TableContainer,} from '@material-ui/core';

type TableProps = {
    type: 'cards' | 'packs'
}

const Table: FC<TableProps> = ({type}) => {
    return (
        <TableContainer component={Paper}>
            {
            }
        </TableContainer>
    );
};

export default Table;
