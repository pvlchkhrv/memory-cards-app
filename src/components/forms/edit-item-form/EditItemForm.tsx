import React, {useState} from 'react'
import {Button, TextField} from '@material-ui/core'
import s from './EditItemForm.module.css'
import {PackPayload} from '../../../store/reducers/packs/types';

type AddItemPropsType = {
    onEditClick: (payload: PackPayload) => void
    setVisible: (visible: boolean) => void
    buttonTitle: string
    pack_id: string
    name: string
}

const EditItemForm: React.FC<AddItemPropsType> = ({onEditClick, buttonTitle, setVisible, name, pack_id}) => {
    const [title, setTitle] = useState<string>(() => name);
    return (
        <form className={s.form}>
            <TextField onChange={e => setTitle(e.currentTarget.value)}
                       value={title}
                       label='New Title...'
            />
            <Button onClick={() => {
                onEditClick({name: title, _id: pack_id})
                setVisible(false)
            }}
                    color='primary'
                    variant='contained'
                    size='medium'
                    className={s.button}
                    disabled={title.length < 1}
            >{buttonTitle}</Button>
        </form>
    )
}

    export default EditItemForm;
