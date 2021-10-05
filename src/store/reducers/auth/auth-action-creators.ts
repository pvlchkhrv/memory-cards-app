import {IUser} from '../../../models/IUser';
import {AuthActionEnum, LoginPayload, SetAuthInfo, SetIsAuth, SetUserData} from './types';
import {AppDispatch} from '../../index';
import {authAPI} from '../../../api/authAPI';
import {AppActionCreators} from '../app/action-creators';
import {handleError} from '../../../utils/handleError';

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserData => ({type: AuthActionEnum.SET_USER_DATA, payload: user}),
    setIsAuth: (isAuth: boolean): SetIsAuth => ({type: AuthActionEnum.SET_IS_AUTH, payload: isAuth}),
    setAuthInfo: (info: string): SetAuthInfo => ({type: AuthActionEnum.SET_INFO, payload: info}),
    login: (payload: LoginPayload) => async (dispatch: AppDispatch) => {
        dispatch(AppActionCreators.setAppStatus('loading'));
        try {
            const user = await authAPI.login(payload);
            // localStorage.setItem('user', JSON.stringify(user));
            dispatch(AuthActionCreators.setUser(user));
            dispatch(AuthActionCreators.setIsAuth(true));
            dispatch(AppActionCreators.setAppStatus('succeed'));
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in console');
            dispatch(AppActionCreators.setAppError(error));
            dispatch(AppActionCreators.setAppStatus('failed'));
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(AppActionCreators.setAppStatus('loading'));
            await authAPI.logout();
            // localStorage.removeItem('auth');
            // localStorage.removeItem('user');
            dispatch(AuthActionCreators.setUser({} as IUser));
            dispatch(AuthActionCreators.setIsAuth(false));
            dispatch(AppActionCreators.setAppStatus('succeed'));
        } catch (e) {
            return handleError(e);
        }
    },
    authMe: () => async (dispatch: AppDispatch) => {
        dispatch(AppActionCreators.setAppStatus('loading'));
        try {
            const user = await authAPI.authMe();
            dispatch(AuthActionCreators.setUser(user));
            dispatch(AuthActionCreators.setIsAuth(true));
            dispatch(AppActionCreators.setAppStatus('succeed'));
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in console');
            dispatch(AppActionCreators.setAppError(error));
            dispatch(AppActionCreators.setAppStatus('failed'));
        }
    },
    register: (email: string, password: string) => async (dispatch: AppDispatch) => {
        dispatch(AppActionCreators.setAppStatus('loading'));
        try {
            await authAPI.register({email, password});
            dispatch(AppActionCreators.setAppStatus('succeed'));
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in console');
            dispatch(AppActionCreators.setAppError(error));
            dispatch(AppActionCreators.setAppStatus('failed'));
        }
    },
    restorePassword: (email: string) => async (dispatch: AppDispatch) => {
        dispatch(AppActionCreators.setAppStatus('loading'));
        try {
            const data = await authAPI.restorePassword({email});
            dispatch(AuthActionCreators.setAuthInfo(data.info));
            dispatch(AppActionCreators.setAppStatus('succeed'));
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in console');
            dispatch(AppActionCreators.setAppError(error));
            dispatch(AppActionCreators.setAppStatus('failed'));
        }
    },
    updateProfile: (name?: string, avatar?: string) => async (dispatch: AppDispatch) => {
        dispatch(AppActionCreators.setAppStatus('loading'));
        try {
            const response = await authAPI.updateProfile({name, avatar});
            dispatch(AuthActionCreators.setUser(response.data.updatedUser));
            dispatch(AppActionCreators.setAppStatus('succeed'));
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in console');
            dispatch(AppActionCreators.setAppError(error));
            dispatch(AppActionCreators.setAppStatus('failed'));
        }
    }
};
