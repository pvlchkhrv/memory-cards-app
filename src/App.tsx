import React, {useEffect} from 'react';
import AppRouter from './components/AppRouter';
import './styles/App.css'
import {useDispatch} from 'react-redux';
import {authMe} from './store/reducers/authReducer';
import {useAppSelector} from './store';
import {Redirect} from 'react-router';

const App = () => {

    return (
        <div className='app'>
            <AppRouter/>
        </div>
    );
};

export default App;
