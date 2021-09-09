import React, {useState} from 'react';
import {useFormik} from 'formik';
import {Button, FormGroup, FormLabel, LinearProgress, Paper, TextField} from '@material-ui/core';
import s from './RegisterForm.module.css'
import VisibilityIcon from '@material-ui/icons/Visibility';
import {useHistory} from 'react-router';
import {useActions} from '../../../hooks/useActions';
import {useAppSelector} from '../../../hooks/useAppSelector';
import RegisteredSuccess from './RegisteredSuccess';

type FormikErrorType = {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const RegisterForm: React.FC = () => {
    const [isRegistered, setIsRegistered] = useState<boolean>(false)
    const history = useHistory();
    const {register} = useActions();
    const {status} = useAppSelector(state => state.app);
    const formik = useFormik({
        initialValues: {
            email: 'panich2303@gmail.com',
            password: '',
            confirmPassword: ''
        },
        validate: values => {
            const errors: FormikErrorType = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required!';
            } else if (values.password.length < 8) {
                errors.password = 'Must be more than 7 characters'
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required!';
            } else if (values.confirmPassword.length < 8) {
                errors.confirmPassword = 'Must be more than 7 characters'
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Does not match the above'
            }

            return errors;
        },
        onSubmit: (values) => {
            setIsRegistered(true);
            register(values.email, values.password);
        },
    });

    if (isRegistered) {
        return <RegisteredSuccess/>
    }

    return (
        <div>
            <Paper className={s.paper} elevation={3}>
                <form className={s.form} onSubmit={formik.handleSubmit}>
                    <FormLabel>
                        <h1 className={s.formLabel}>Sign Up</h1>
                    </FormLabel>
                    <FormGroup className={s.formGroup}>
                        <TextField
                            variant={'standard'}
                            label='Email'
                            margin='normal'
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
                            type='password'
                            label='Confirm password'
                            margin='normal'
                            {...formik.getFieldProps('confirmPassword')}
                        />
                        {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword ?
                            <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div> : null}
                        <VisibilityIcon className={s.icon1}/>
                        <VisibilityIcon className={s.icon2}/>
                        <div className={s.buttonBlock}>
                            <Button
                                onClick={() => history.push('/login')}
                                color={'secondary'}
                                className={s.button}
                                variant={'contained'}
                            >
                                Cancel</Button>
                            <Button
                                type={'submit'}
                                color={'primary'}
                                variant={'contained'}
                                className={s.button}
                                disabled={status === 'loading'}
                            >
                                Sign Up</Button>
                        </div>
                    </FormGroup>
                </form>
            </Paper>
            {status === 'loading' && <LinearProgress/>}
        </div>
    )
}

export {
    RegisterForm
}
