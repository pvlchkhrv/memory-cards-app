import React, {useState} from 'react'
import {useFormik} from 'formik'
import {Button, FormGroup, FormLabel, Paper, TextField} from '@material-ui/core'
import s from './RestorePassword.module.css'
import CheckEmail from './CheckEmail'
import {useHistory} from 'react-router'
import {useAppSelector} from '../../../hooks/useAppSelector';
import {useActions} from '../../../hooks/useActions';

type FormikErrorType = {
    email?: string;
}

const RestorePasswordForm: React.FC = () => {
    const info = useAppSelector(state => state.auth.info);
    const status = useAppSelector(state => state.app.status);
    const [isSent, setIsSent] = useState<boolean>(false);
    const {restorePassword} = useActions();
    const history = useHistory();
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
            setIsSent(true);
            restorePassword(values.email);
        },
    });

    if (isSent) {
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
        </div>
    )
}

export {
    RestorePasswordForm
}
