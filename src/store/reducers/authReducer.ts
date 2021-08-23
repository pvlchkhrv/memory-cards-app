import {AuthActions, AuthActionsType, AuthStateType, LoginPayloadType, UserDataType} from '../../types/authTypes';
import {AppThunkType} from '../index';
import {setAppError, setAppStatus} from './appReducer';
import {authAPI} from '../../api/authAPI';
import {AppActions} from '../../types/appTypes';

const initState: AuthStateType = {
    user: null,
    isAuth: false

}

const authReducer = (state = initState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case AuthActions.SET_USER_DATA:
            return {...state, user: action.payload}
        case AuthActions.SET_IS_AUTH:
            return {...state, isAuth: action.isAuth}
        default:
            return state
    }
}

const setUserData = (payload: UserDataType) => ({type: AuthActions.SET_USER_DATA, payload}) as const
const setIsAuth = (isAuth: boolean) => ({type: AuthActions.SET_IS_AUTH, isAuth}) as const

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
        dispatch(setIsAuth( true))
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
    authMe,
    login
}
