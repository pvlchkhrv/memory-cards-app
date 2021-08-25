import {combineReducers} from 'redux'
import {authReducer} from './authReducer'
import {appReducer} from './appReducer'
import {packsReducer} from './packsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    packs: packsReducer,

})

export type RootStateType = ReturnType<typeof rootReducer>

export {
    rootReducer
}
