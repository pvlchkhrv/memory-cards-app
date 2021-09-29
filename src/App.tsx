import React, {useEffect} from 'react';
import AppRouter from './components/AppRouter';
import './styles/App.css';
import {CircularProgress, Container} from '@material-ui/core';
import ErrorBar from './components/common/error-bar/ErrorBar';
import Navbar from './components/Navbar/Navbar';
import {useAppSelector} from './hooks/useAppSelector';
import {useActions} from './hooks/useActions';

const App = () => {
    console.log('APP')
    const error = useAppSelector(state => state.app.error)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const {initializeApp} = useActions();

    useEffect(() => {
        initializeApp();
    }, []);

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '40%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className='app'>
            <Navbar/>
            <Container className='container'>
                <AppRouter/>
                {error && <ErrorBar/>}
            </Container>
        </div>
    );
};

export default App
