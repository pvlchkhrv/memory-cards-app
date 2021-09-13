import React, {useState} from 'react'
import {Button, TextField} from '@material-ui/core'
import s from './AddNewItemForm.module.css'

type AddItemPropsType = {
    onClick: (title: string) => void
    setVisible: (visible: boolean) => void
    buttonTitle: string
}

const AddNewItemForm: React.FC<AddItemPropsType> = ({onClick, buttonTitle, setVisible}) => {
    const [title, setTitle] = useState<string>('');
    return (
        <form className={s.form}>
            <TextField onChange={event => setTitle(event.currentTarget.value)}
                       placeholder='Title'
                       value={title}
            />
            <div className={s.button}>
                <Button onClick={() => {
                    onClick(title)
                    setVisible(false)
                    setTitle('')
                }}
                        color='primary'
                        variant='outlined'
                        size='medium'
                        className={s.button}
                        disabled={title.length < 1}
                >{buttonTitle}</Button>
            </div>
        </form>
    )
}

export default AddNewItemForm;
