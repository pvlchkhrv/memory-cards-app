type RequestStatusType = 'idle' | 'loading' | 'succeed' | 'failed';

interface AppState {
    isInitialized: boolean;
    status: RequestStatusType;
    error: string;
}

export enum AppActionEnum {
    SET_APP_IS_INITIALIZED = 'SET_APP_IS_INITIALIZED',
    SET_APP_STATUS = 'SET_APP_STATUS',
    SET_APP_ERROR = 'SET_APP_ERROR',
}

interface SetAppIsInitialized {
    type: AppActionEnum.SET_APP_IS_INITIALIZED;
    payload: boolean;
}

interface SetAppStatus {
    type: AppActionEnum.SET_APP_STATUS;
    payload: RequestStatusType;
}

interface SetAppError {
    type: AppActionEnum.SET_APP_ERROR;
    payload: string;
}

type AppAction =
    | SetAppIsInitialized
    | SetAppStatus
    | SetAppError

export type {
    AppAction,
    AppState,
    SetAppError,
    SetAppStatus,
    SetAppIsInitialized,
    RequestStatusType
}
