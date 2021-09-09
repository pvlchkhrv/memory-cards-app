import {combineReducers} from 'redux';
import authReducer from './auth';
import {packsReducer} from './packs/packsReducer';
import appReducer from './app';

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    packs: packsReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export {
    rootReducer
};
