import React from 'react';
import AppRouter from './components/AppRouter';
import {Container} from '@material-ui/core';
import './styles/App.css'
import {BrowserRouter} from 'react-router-dom';

const App = () => {

    return (
        <div className='app'>
                <BrowserRouter>
                        <AppRouter/>
                </BrowserRouter>
        </div>
    );
};

export default App;
