import React, {useEffect} from 'react';
import AppRouter from './components/AppRouter';
import './styles/App.css'
import {BrowserRouter} from 'react-router-dom';
import {setAppStatus} from './store/reducers/appReducer';

const App = () => {

    // useEffect(() => {
    //     if (localStorage.getItem('auth')) {
    //         setIsAuth({isAuth: true});
    //     }
    //     setAppStatus({status: 'succeed'});
    // }, [])
    return (
        <div className='app'>
                <BrowserRouter>
                        <AppRouter/>
                </BrowserRouter>
        </div>
    );
};

export default App;
