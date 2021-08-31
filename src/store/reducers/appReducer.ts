import {AppActions, AppActionsType, AppStateType, RequestStatusType} from '../../types/appTypes';

const initState: AppStateType = {
    isInitialized: false,
    status: 'idle',
    error: null
}
const appReducer = (state: AppStateType = initState, action: AppActionsType) => {
    switch (action.type) {
        case AppActions.SET_APP_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        case AppActions.SET_APP_STATUS:
            return {...state, status: action.status}
        case AppActions.SET_APP_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}

const setAppError = (error: string | null) => ({type: AppActions.SET_APP_ERROR, error}) as const
const setAppStatus = (status: RequestStatusType) => ({type: AppActions.SET_APP_STATUS, status}) as const
const setAppIsInitialized = (isInitialized: boolean) => ({type: AppActions.SET_APP_IS_INITIALIZED, isInitialized}) as const


export {
    appReducer,
    setAppError,
    setAppStatus,
    setAppIsInitialized
}
