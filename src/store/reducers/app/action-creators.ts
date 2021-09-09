import {AppActionEnum, RequestStatusType, SetAppError, SetAppIsInitialized, SetAppStatus} from './types';
import {AppDispatch} from '../../index';
import {AuthActionCreators} from '../auth/auth-action-creators';
import {handleError} from '../../../utils/handleError';

export const AppActionCreators = {
    setAppIsInitialized: (isInitialized: boolean): SetAppIsInitialized => ({
        type: AppActionEnum.SET_APP_IS_INITIALIZED,
        payload: isInitialized
    }),
    setAppStatus: (status: RequestStatusType): SetAppStatus => ({type: AppActionEnum.SET_APP_STATUS, payload: status}),
    setAppError: (error: string): SetAppError => ({type: AppActionEnum.SET_APP_ERROR, payload: error}),
    initializeApp: () => (dispatch: AppDispatch) => {
        dispatch(AppActionCreators.setAppStatus('loading'));
        try {
            const user = localStorage.getItem('user');
            if (user) {
                dispatch(AuthActionCreators.setUser(JSON.parse(user)));
                dispatch(AppActionCreators.setAppIsInitialized(true));
                dispatch(AppActionCreators.setAppStatus('succeed'));
            } else {
                dispatch(AppActionCreators.setAppIsInitialized(true))
                dispatch(AppActionCreators.setAppStatus('succeed'));
            }
        } catch (e) {
            handleError(e);
        }
    }
}
