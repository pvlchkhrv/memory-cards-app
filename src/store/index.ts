import {applyMiddleware, createStore} from '@reduxjs/toolkit'
import {rootReducer, RootStateType} from './reducers'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import thunk, {ThunkAction} from 'redux-thunk';
import {AppRootActionsType} from '../types/appTypes';

const store = createStore(rootReducer, applyMiddleware(thunk))

const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
export type AppThunkType = ThunkAction<void, RootStateType, unknown, AppRootActionsType>

export {
    store,
    useAppSelector
}

//@ts-ignore
window.store = store
