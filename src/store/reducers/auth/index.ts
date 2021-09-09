import {AuthAction, AuthActionEnum, AuthState} from './types';
import {IUser} from '../../../models/IUser';

const initialState: AuthState = {
    user: {} as IUser,
    isAuth: false,
    info: '',
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionEnum.SET_USER_DATA:
            return {...state, user: action.payload};
        case AuthActionEnum.SET_IS_AUTH:
            return {...state, isAuth: action.payload};
        case AuthActionEnum.SET_INFO:
            return {...state, info: action.payload};
        default:
            return state;
    }
};

// const authMe = (): AppThunkType => async (dispatch) => {
//     dispatch(setAppStatus('loading'))
//     try {
//         const data = await authAPI.authMe()
//         dispatch(setUserData(data))
//         dispatch(setIsAuth(true))
//         dispatch(setAppStatus('succeed'))
//         localStorage.setItem('auth', 'true')
//         if (!data) {
//             setAppError('No internet connection!')
//         }
//     } catch (e) {
//         dispatch(setAppError(e.response.data.error))
//         dispatch(setAppStatus('failed'))
//     }
// }
// const register = (payload: RegisterPayloadType): AppThunkType => async (dispatch) => {
//     dispatch(setAppStatus('loading'))
//     try {
//         const data = await authAPI.register(payload)
//         dispatch(setIsRegistered(true))
//         dispatch(setAppStatus('succeed'))
//     } catch (e) {
//         dispatch(setAppError(e.response.data.error))
//         dispatch(setAppStatus('failed'))
//     }
// }
// const restorePassword = (payload: { email: string }): AppThunkType => async (dispatch) => {
//     dispatch(setAppStatus('loading'))
//     try {
//         const data = await authAPI.restorePassword(payload)
//         dispatch(setAuthInfo(data.info))
//         dispatch(setAppStatus('succeed'))
//     } catch (e) {
//         dispatch(setAppError(e.response.data.error))
//         dispatch(setAppStatus('failed'))
//     }
// }

export default authReducer;
