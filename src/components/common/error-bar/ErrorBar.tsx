import React from 'react';
import {Alert} from '@material-ui/lab';
import {useDispatch} from 'react-redux';
import {Snackbar} from '@material-ui/core';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {useActions} from '../../../hooks/useActions';

const ErrorBar = () => {
    const dispatch = useDispatch();
    const error = useAppSelector<string | null>(state => state.app.error);
    const {setAppError} = useActions();
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppError(''));
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
