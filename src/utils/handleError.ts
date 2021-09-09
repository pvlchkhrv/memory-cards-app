import {AppActionCreators} from '../store/reducers/app/action-creators';
import {AppDispatch} from '../store';

export const handleError = (e: any) => (dispatch: AppDispatch)=> {
    const error = e.response ? e.response.data.error : (e.message + ', more details in console');
    dispatch(AppActionCreators.setAppError(error));
    dispatch(AppActionCreators.setAppStatus('failed'))
}
