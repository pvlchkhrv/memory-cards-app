import React, {useState} from 'react';
import {RestorePasswordForm} from '../components/forms/restore-password/RestorePasswordForm';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../store';
import {restorePassword} from '../store/reducers/authReducer';

const RestorePassword = () => {
    const dispatch = useDispatch()
    const info = useAppSelector(state => state.auth.info)
    const status = useAppSelector(state => state.app.status)
    const [email, setEmail] = useState('')
    const onSubmitHandler = (payload: { email: string }) => {
        dispatch(restorePassword(payload))
    }

    return (
        <div>
            <RestorePasswordForm onSubmitHandler={onSubmitHandler}
                                 info={info}
                                 status={status}
            />
        </div>
    );
};

export default RestorePassword;
