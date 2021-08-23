import React from 'react';
import {useFormik} from 'formik';
import {Button, FormGroup, FormLabel, Paper, TextField} from '@material-ui/core';
import s from './SetPassword.module.css';

type SetPasswordPropsType = {
    onSubmitHandler: (values: {}) => void
}

type FormikErrorType = {
    password?: string;
}

const SetPasswordForm: React.FC<SetPasswordPropsType> = ({onSubmitHandler}) => {
    const formik = useFormik({
        initialValues: {
            password: 'panich2303@gmail.com',
        },
        validate: values => {
            const errors: FormikErrorType = {};

            if (!values.password) {
                errors.password = 'Password is required!';
            } else if (values.password.length < 8) {
                errors.password = 'Must be more than 7 characters'
            }

            return errors;
        },
        onSubmit: (values) => {
            onSubmitHandler(values);
        },
    });
    return (
        <Paper className={s.paper} elevation={3}>
            <FormLabel>
                <h3 style={{color: '#2D2E46'}}>Create New Password</h3>
            </FormLabel>
            <FormGroup className={s.formGroup}>
                <TextField
                    variant={'standard'}
                    label='New password'
                    type='password'
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.password &&
                formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                <TextField
                    variant={'standard'}
                    label='Confirm password'
                    type='password'
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.password &&
                formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                <p className={s.text}>Create new password and we will send you further instructions to email</p>
                <Button
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                    className={s.button}
                    onClick={() => {
                    }}>
                    Send my password</Button>
                <Button
                    onClick={() => {
                    }}
                    type={'submit'}
                    variant={'contained'}
                    color={'secondary'}
                    className={s.button}>
                    Cancel</Button>
            </FormGroup>
        </Paper>
    );
};

export {
    SetPasswordForm
}
