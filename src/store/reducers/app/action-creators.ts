import {AppActionEnum, RequestStatusType, SetAppError, SetAppIsInitialized, SetAppStatus} from './types';
import {AppDispatch} from '../../index';
import {AuthActionCreators} from '../auth/auth-action-creators';
import {authAPI} from '../../../api/authAPI';

export const AppActionCreators = {
    setAppIsInitialized: (isInitialized: boolean): SetAppIsInitialized => ({
        type: AppActionEnum.SET_APP_IS_INITIALIZED,
        payload: isInitialized
    }),
    setAppStatus: (status: RequestStatusType): SetAppStatus => ({type: AppActionEnum.SET_APP_STATUS, payload: status}),
    setAppError: (error: string): SetAppError => ({type: AppActionEnum.SET_APP_ERROR, payload: error}),
    initializeApp: () => async (dispatch: AppDispatch) => {
        dispatch(AppActionCreators.setAppStatus('loading'));
        try {
            const user = await authAPI.authMe();
            if (user) {
                dispatch(AuthActionCreators.setUser(user));
                dispatch(AppActionCreators.setAppIsInitialized(true));
                dispatch(AuthActionCreators.setIsAuth(true));
                dispatch(AppActionCreators.setAppStatus('succeed'));
            } else {
                dispatch(AppActionCreators.setAppIsInitialized(true));
                dispatch(AppActionCreators.setAppStatus('succeed'));
            }
         } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in console');
            dispatch(AppActionCreators.setAppIsInitialized(true));
            dispatch(AppActionCreators.setAppError(error));
            dispatch(AppActionCreators.setAppStatus('failed'));
        }
    }
}
