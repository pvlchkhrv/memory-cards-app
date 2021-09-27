import React, {useEffect} from 'react';
import AppRouter from './components/AppRouter';
import './styles/App.css';
import {CircularProgress, Container, LinearProgress} from '@material-ui/core';
import ErrorBar from './components/common/error-bar/ErrorBar';
import Navbar from './components/Navbar/Navbar';
import {useAppSelector} from './hooks/useAppSelector';
import {useActions} from './hooks/useActions';

const App = () => {
    const {isInitialized, status, error} = useAppSelector(state => state.app);
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
            <Container fixed className='container'>
                <AppRouter/>
                {error && <ErrorBar/>}
            </Container>
        </div>
    );
};

export default App
