import React, {useState} from 'react';
import {useFormik} from 'formik';
import {Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Paper, TextField} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import s from './LoginForm.module.css';
import {Link} from 'react-router-dom';
import {LoginPayload} from '../../../store/reducers/auth/types';
import {RequestStatusType} from '../../../store/reducers/app/types';

type LoginPropsType = {
    onSubmitHandler: (values: LoginPayload) => void
    status: RequestStatusType
}

type FormikErrorType = {
    email?: string;
    password?: string;
}

const LoginForm: React.FC<LoginPropsType> = ({onSubmitHandler, status}) => {
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
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = 'Should be more than 7 characters'
            }

            return errors;
        },
        onSubmit: (values) => {
            onSubmitHandler(values);
        },
    });
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <Paper elevation={3} className={s.paper}>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <FormLabel>
                    <h1 className={s.formLabel}>Log In</h1>
                </FormLabel>
                <FormGroup className={s.formGroup}>
                    <TextField
                        variant={'standard'}
                        label='Email'
                        margin="normal"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email &&
                    formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                    <TextField
                        variant={'standard'}
                        type={visible ? 'text' : 'password'}
                        label='Password'
                        margin='normal'
                        className={s.passwordInput}
                        {...formik.getFieldProps('password')}
                    />
                    {
                        formik.values.password.length > 0
                        && <VisibilityIcon className={s.icon}
                                           onClick={() => setVisible(!visible)}
                                           color={visible ? 'primary' : 'inherit'}
                                           style={formik.errors.password
                                               ? ({top: '29%', left: '58%'})
                                               : ({top: '30.5%', left: '58%'})
                                           }
                        />
                    }
                    {formik.touched.password &&
                    formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                    <FormControlLabel
                        label={'Remember me'}
                        control={
                            <Checkbox
                                {...formik.getFieldProps('rememberMe')}
                                color='primary'
                            />
                        }
                    />
                </FormGroup>
                <Button
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                    className={s.button}
                    disabled={status === 'loading'}
                >
                    Sign In</Button>
                <div className={s.signUpBlock}>
                    <span>Don't have an account? <Link to='/register'>Sign Up!</Link></span>
                    <Link to='/restore'>Forgot Password?</Link>
                </div>
            </form>
        </Paper>
    );
};

export {
    LoginForm
}
