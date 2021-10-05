import React from 'react';
import {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    // onBlur: (name: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [value, setValue] = useState(props.value);
    const activateEditMode = () => {
        setEditMode(true);
        // setValue(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(value);
    }
    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={value} onChange={changeValue} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode} placeholder={'Type here please'}>
            <CreateIcon fontSize={'small'}/>
            {props.value}
        </span>
});
