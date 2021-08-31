import React, {useState} from 'react'
import {Button, TextField} from '@material-ui/core'
import s from './AddNewItemForm.module.css'

type AddItemPropsType = {
    onClick: (e: React.FormEvent<HTMLButtonElement>, title: string) => void
    setVisible: (visible: boolean) => void
    type: string
}

const AddNewItemForm: React.FC<AddItemPropsType> = ({onClick, type, setVisible}) => {
    const [title, setTitle] = useState<string>('')
    return (
        <form className={s.form}>
            <TextField onChange={event => setTitle(event.currentTarget.value)}
                       placeholder='Title'
            />
            <div className={s.button}>
                <Button onClick={(event) => {
                    onClick(event, title)
                    setVisible(false)
                }}
                        color='primary'
                        variant='outlined'
                        size='medium'
                        className={s.button}
                >Create {type}</Button>
            </div>
        </form>
    )
}

export default AddNewItemForm;
