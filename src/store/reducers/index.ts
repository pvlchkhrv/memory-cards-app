import {combineReducers} from 'redux';
import authReducer from './auth';
import packsReducer from './packs';
import appReducer from './app';
import cardsReducer from './cards';

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    packs: packsReducer,
    cards: cardsReducer
});

export type RootStateType = ReturnType<typeof rootReducer>;

export {
    rootReducer
};
