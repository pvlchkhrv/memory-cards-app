import React, {useState} from 'react';
import {useFormik} from 'formik';
import {Button, FormControl, FormGroup, FormLabel, Paper, TextField} from '@material-ui/core';
import s from './RestorePassword.module.css'
import CheckEmail from './CheckEmail';
import {useHistory} from 'react-router';

type RestorePasswordPropsType = {
    onSubmitHandler: (values: { email: string }) => void
}

type FormikErrorType = {
    email?: string;
    password?: string;
}

const RestorePasswordForm: React.FC<RestorePasswordPropsType> = ({onSubmitHandler}) => {
    const [isSent, setIsSent] = useState<boolean>(false);
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: 'panich2303@gmail.com',
        },
        validate: values => {
            const errors: FormikErrorType = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            return errors;
        },
        onSubmit: (values) => {
            onSubmitHandler(values);
        },
    });
    if (isSent) {
        return <CheckEmail email={'sapofapmfpdmaf'}/>
    }
    return (
        <Paper className={s.paper} elevation={3}>
            <FormLabel>
                <h3>Forgot your password?</h3>
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
                <p className={s.text}>Enter your email address and we will send you further instructions</p>
                <Button
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                    className={s.button}
                    onClick={() => setIsSent(true)}>
                    Send my password</Button>
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
    RestorePasswordForm
}
