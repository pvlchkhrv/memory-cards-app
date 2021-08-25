import {setAppError, setAppIsInitialized, setAppStatus} from '../store/reducers/appReducer';
import {AuthActionsType} from './authTypes';
import {PacksActionsType} from './packsTypes';

export type RequestStatusType = 'idle' | 'loading' | 'succeed' | 'failed'
export type AppStateType = {
    isInitialized: boolean;
    status: RequestStatusType;
    error: string | null
}

export enum AppActions {
    SET_APP_IS_INITIALIZED = 'SET_APP_IS_INITIALIZED',
    SET_APP_STATUS = 'SET_APP_STATUS',
    SET_APP_ERROR = 'SET_APP_ERROR'
}

export type AppActionsType =
    | ReturnType<typeof setAppIsInitialized>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>

export type AppRootActionsType =
    | AppActionsType
    | AuthActionsType
    | PacksActionsType
