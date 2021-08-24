import React, {useState} from 'react'
import {useFormik} from 'formik'
import {Button, FormGroup, FormLabel, LinearProgress, Paper, TextField} from '@material-ui/core'
import s from './RestorePassword.module.css'
import CheckEmail from './CheckEmail'
import {useHistory} from 'react-router'
import {RequestStatusType} from '../../../types/appTypes';

type RestorePasswordPropsType = {
    onSubmitHandler: (values: { email: string }) => void;
    info: string | null;
    status: RequestStatusType;
}

type FormikErrorType = {
    email?: string;
}

const RestorePasswordForm: React.FC<RestorePasswordPropsType> = ({onSubmitHandler, info, status}) => {
    const history = useHistory()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: values => {
            const errors: FormikErrorType = {}

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: (values) => {
            onSubmitHandler(values)
        },
    });
    if (status === 'succeed') {
        return <CheckEmail info={info}/>
    }
    return (
        <div>
            <Paper className={s.paper} elevation={3}>
                <form className={s.form} onSubmit={formik.handleSubmit}>
                    <FormLabel>
                        <h2 className={s.formLabel}>Forgot your password?</h2>
                    </FormLabel>
                    <FormGroup className={s.formGroup}>
                        <TextField
                            variant='standard'
                            label='Email'
                            margin='normal'
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email &&
                        formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <p className={s.text}>Enter your email address and we will send you further instructions</p>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={s.button}
                            disabled={status === 'loading'}
                        >
                            Send my password</Button>
                        <Button
                            onClick={() => history.push('/login')}
                            variant='contained'
                            color='secondary'
                            className={s.button}>
                            Cancel</Button>
                    </FormGroup>
                </form>
            </Paper>
            {status === 'loading' && <LinearProgress/>}
        </div>
    )
}

export {
    RestorePasswordForm
}
