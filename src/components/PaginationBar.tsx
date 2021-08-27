import React, {ChangeEvent} from 'react'
import {Pagination} from '@material-ui/lab'
import MySelect from './common/select/MySelect'
import s from './PaginationBar.module.css'

type PaginationBarPropsType = {
    page?: number
    pageCount: number
    packsTotal: number
    handlePageChange: (e: React.ChangeEvent<unknown>, value: number) => void
    handlePageCountChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const PaginationBar: React.FC<PaginationBarPropsType> = ({
                                                             page,
                                                             pageCount,
                                                             packsTotal,
                                                             handlePageChange,
                                                             handlePageCountChange
                                                         }) => {
    const options = [
        {value: '10', name: '10'},
        {value: '15', name: '15'},
        {value: '20', name: '20'},
    ]
    const totalPages = Math.ceil(packsTotal / pageCount)
    return (
        <div className={s.paginationBar}>
            <Pagination count={totalPages}
                        variant='outlined'
                        color='primary'
                        page={page}
                        onChange={handlePageChange}
            />
            <MySelect options={options}
                      defaultValue='Packs on page'
                      onChange={handlePageCountChange}
            />
        </div>
    )
}

export default PaginationBar;
