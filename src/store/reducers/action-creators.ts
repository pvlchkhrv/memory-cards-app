import {AppActionCreators} from './app/action-creators';
import {AuthActionCreators} from './auth/auth-action-creators';

export const allActionCreators = {
    ...AppActionCreators,
    ...AuthActionCreators,
};
