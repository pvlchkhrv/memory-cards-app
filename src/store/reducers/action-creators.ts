import {AppActionCreators} from './app/action-creators';
import {AuthActionCreators} from './auth/auth-action-creators';
import {PacksActionCreators} from './packs/packs-action-creators';
import {CardsActionCreators} from './cards/cards-action-creators';

export const allActionCreators = {
    ...AppActionCreators,
    ...AuthActionCreators,
    ...PacksActionCreators,
    ...CardsActionCreators
};
