import {PacksActions, PacksActionsType, PacksStateType, PackType} from '../../types/packsTypes';


const initState: PacksStateType  = {
    packs: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 10
}

const packsReducer = (state = initState, action: PacksActionsType): PacksStateType => {
    switch (action.type) {
        case PacksActions.SET_PACKS:
            return {...state, packs: action.payload}
        default:
            return state
    }
}

const setPacks = (payload: PackType []) => ({type: PacksActions.SET_PACKS, payload}) as const

export {
    packsReducer,
    setPacks
}
