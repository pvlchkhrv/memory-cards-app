import {
    AuthActions,
    AuthActionsType,
    AuthStateType,
    LoginPayloadType,
    RegisterPayloadType,
    UserDataType
} from '../../types/authTypes';
import {AppThunkType} from '../index';
import {setAppError, setAppStatus} from './appReducer';
import {authAPI} from '../../api/authAPI';

const initState: AuthStateType = {
    user: null,
    isAuth: false,
    isRegistered: false,
    info: null,
    email: null,
}

const authReducer = (state = initState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case AuthActions.SET_USER_DATA:
            return {...state, user: action.payload}
        case AuthActions.SET_IS_AUTH:
            return {...state, isAuth: action.isAuth}
        case AuthActions.SET_IS_REGISTERED:
            return {...state, isRegistered: action.isRegistered}
        case AuthActions.SET_INFO:
            return {...state, info: action.info}
        case AuthActions.SET_EMAIL:
            return {...state, email: action.email}
        default:
            return state
    }
}

const setUserData = (payload: UserDataType) => ({type: AuthActions.SET_USER_DATA, payload}) as const
const setIsAuth = (isAuth: boolean) => ({type: AuthActions.SET_IS_AUTH, isAuth}) as const
const setIsRegistered = (isRegistered: boolean) => ({type: AuthActions.SET_IS_REGISTERED, isRegistered}) as const
const setAuthInfo = (info: string | null) => ({type: AuthActions.SET_INFO, info}) as const
const setAuthEmail = (email: string | null) => ({type: AuthActions.SET_EMAIL, email}) as const

const authMe = (): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const data = await authAPI.authMe()
        dispatch(setUserData(data))
        dispatch(setIsAuth(true))
        dispatch(setAppStatus('succeed'))
    } catch (e) {
        dispatch(setAppError(e.response.data.error))
        dispatch(setAppStatus('failed'))
    }
}
const login = (payload: LoginPayloadType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const data = await authAPI.login(payload)
        dispatch(setUserData(data))
        dispatch(setIsAuth(true))
        dispatch(setAppStatus('succeed'))
    } catch (e) {
        dispatch(setAppError(e.response.data.error))
        dispatch(setAppStatus('failed'))
    }
}
const register = (payload: RegisterPayloadType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const data = await authAPI.register(payload)
        dispatch(setIsRegistered(true))
        dispatch(setAppStatus('succeed'))
    } catch (e) {
        dispatch(setAppError(e.response.data.error))
        dispatch(setAppStatus('failed'))
    }
}
const restorePassword = (payload: { email: string }): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const data = await authAPI.restorePassword(payload)
        dispatch(setAuthInfo(data.info))
        dispatch(setAppStatus('succeed'))
    } catch (e) {
        dispatch(setAppError(e.response.data.error))
        dispatch(setAppStatus('failed'))
    }
}

export {
    authReducer,
    setUserData,
    setIsAuth,
    setIsRegistered,
    setAuthInfo,
    setAuthEmail,
    authMe,
    login,
    register,
    restorePassword
}
