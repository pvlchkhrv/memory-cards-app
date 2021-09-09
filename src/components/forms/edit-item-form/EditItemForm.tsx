import React, {useState} from 'react'
import {Button, TextField} from '@material-ui/core'
import s from './EditItemForm.module.css'
import {PackPayloadType} from '../../../types/packsTypes';

type AddItemPropsType = {
    onEditClick: (payload: PackPayloadType) => void
    setVisible: (visible: boolean) => void
    buttonTitle: string
    pack_id: string
    name: string
}

const EditItemForm: React.FC<AddItemPropsType> = ({onEditClick, buttonTitle, setVisible, name, pack_id}) => {
    const [title, setTitle] = useState<string>(name)
    return (
        <form className={s.form}>
            <TextField onChange={e => setTitle(e.currentTarget.value)}
                       value={title}
            />
            <div className={s.button}>
                <Button onClick={() => {
                    onEditClick({name: title, _id: pack_id})
                    setVisible(false)
                    setTitle('')
                }}
                        color='primary'
                        variant='outlined'
                        size='medium'
                        className={s.button}
                >{buttonTitle}</Button>
            </div>
        </form>
    )
}

export default EditItemForm;