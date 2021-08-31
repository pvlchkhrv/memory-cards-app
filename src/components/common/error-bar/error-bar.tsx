import React from 'react'
import {Alert} from '@material-ui/lab'
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../store';
import {setAppError} from '../../../store/reducers/appReducer';
import {Snackbar} from '@material-ui/core';

const ErrorBar = () => {
    const dispatch = useDispatch()
    const error = useAppSelector<string | null>(state => state.app.error)
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppError(null));
    }
    const isOpen = error !== null;

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert variant='outlined' severity='error'>
                {error}
            </Alert>
        </Snackbar>

    )
}

export default ErrorBar
