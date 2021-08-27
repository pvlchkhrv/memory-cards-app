import {applyMiddleware, compose, createStore} from '@reduxjs/toolkit'
import {rootReducer, RootStateType} from './reducers'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import thunk, {ThunkAction} from 'redux-thunk'
import {AppRootActionsType} from '../types/appTypes'
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
export type AppThunkType = ThunkAction<void, RootStateType, unknown, AppRootActionsType>

export {
    store,
    useAppSelector
}

//@ts-ignore
window.store = store
