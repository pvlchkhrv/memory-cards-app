import React, {useEffect} from 'react';
import AppRouter from './components/AppRouter';
import './styles/App.css'
import {BrowserRouter} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setIsAuth} from './store/reducers/authReducer';

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem('auth') === 'true') {
            dispatch(setIsAuth(true))
        }
    }, [])
    return (
        <div className='app'>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </div>
    );
};

export default App;
