import React from 'react'
import {Pagination} from '@material-ui/lab'
import MySelect from './common/select/MySelect'
import s from './PaginationBar.module.css'

const PaginationBar = () => {
    const options = [
        {value: '10', name: '10'},
        {value: '15', name: '15'},
        {value: '20', name: '20'},

    ]
    return (
        <div className={s.paginationBar}>
            <Pagination count={10}
                        variant='outlined'
                        color='primary' />
            <MySelect options={options}
                      onChange={() => {
                      }}
            />
        </div>
    )
}

export default PaginationBar;
