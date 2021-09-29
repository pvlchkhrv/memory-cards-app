    import {AppAction, AppActionEnum, AppState} from './types';

const initialState: AppState = {
    isInitialized: false,
    status: 'idle',
    error: ''
};

const appReducer = (state = initialState, action: AppAction): AppState => {
    switch (action.type) {
        case AppActionEnum.SET_APP_IS_INITIALIZED:
            return {...state, isInitialized: action.payload};
        case AppActionEnum.SET_APP_STATUS:
            return {...state, status: action.payload};
        case AppActionEnum.SET_APP_ERROR:
            return {...state, error: action.payload};
        default:
            return state;
    }
};

export default appReducer;
