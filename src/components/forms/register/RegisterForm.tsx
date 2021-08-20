import React from 'react';
import {useFormik} from 'formik';
import {Button, FormControl, FormGroup, FormLabel, Paper, TextField} from '@material-ui/core';
import s from './RegisterForm.module.css'
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Redirect, useHistory} from 'react-router';

type RegisterPropsType = {
    onSubmitHandler: (values: {email: string, password: string}) => void
}

type FormikErrorType = {
    email?: string;
    password?: string;
}

const RegisterForm: React.FC<RegisterPropsType> = ({onSubmitHandler}) => {
    const formik = useFormik({
        initialValues: {
            email: 'panich2303@gmail.com',
            password: '12345678',
        },
        validate: values => {
            const errors: FormikErrorType = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

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
    const history = useHistory();

    return (
        <Paper className={s.paper} elevation={3}>
                    <FormLabel>
                        <h3 className={s.formLabel}>Sign Up</h3>
                    </FormLabel>
                    <FormGroup className={s.formGroup}>
                        <TextField
                            variant={'standard'}
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email &&
                        formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField
                            variant={'standard'}
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password &&
                        formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        <TextField
                            variant={'standard'}
                            type="password"
                            label="Confirm password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password &&
                        formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        <VisibilityIcon className={s.icon1}/>
                        <VisibilityIcon className={s.icon2}/>
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            className={s.button}>
                            Sign Up</Button>
                        <Button
                            onClick={() => history.push('/login')}
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
    RegisterForm
}