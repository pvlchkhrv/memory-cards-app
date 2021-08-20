import React from 'react';
import {useFormik} from 'formik';
import {Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Paper, TextField} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import s from './LoginForm.module.css';
import {Link} from 'react-router-dom';

type LoginPropsType = {
    onSubmitHandler: (values: { email: string, password: string, rememberMe: boolean }) => void
}

type FormikErrorType = {
    email?: string;
    password?: string;
}

const LoginForm: React.FC<LoginPropsType> = ({onSubmitHandler}) => {
    const formik = useFormik({
        initialValues: {
            email: 'panich2303@gmail.com',
            password: '12345678',
            rememberMe: false,
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

    return (
        <Paper className={s.paper} elevation={3}>
            <FormLabel>
                <h3 className={s.formLabel}>Sign In</h3>
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
                <VisibilityIcon className={s.icon}/>
                <FormControlLabel
                    label={'Remember me'}
                    control={
                        <Checkbox
                            {...formik.getFieldProps('rememberMe')}
                            color='primary'/>
                    }
                />
                <Button
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                    className={s.button}>
                    Log In</Button>
            </FormGroup>
            <div className={s.signUpBlock}>
                <p>Don't have an account?</p>
                <Link to='/register'>Sign Up</Link>
                <Link to='/restore'>Forgot Password</Link>
            </div>

        </Paper>
    );
};

export {
    LoginForm
}
