import {AppActionCreators} from './app/action-creators';
import {AuthActionCreators} from './auth/auth-action-creators';
import {PacksActionCreators} from './packs/packs-action-creators';

export const allActionCreators = {
    ...AppActionCreators,
    ...AuthActionCreators,
    ...PacksActionCreators,
};
