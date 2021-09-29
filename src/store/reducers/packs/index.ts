import {PacksAction, PacksActions, PacksState} from './types';

const initState: PacksState = {
    packs: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    filter: '',
    isMine: false
}

const packsReducer = (state = initState, action: PacksAction): PacksState => {
    switch (action.type) {
        case PacksActions.SET_PACKS:
            return {...state, packs: action.payload};
        case PacksActions.SET_PAGE_COUNT:
            return {...state, pageCount: action.payload};
        case PacksActions.SET_PAGE:
            return {...state, page: action.payload};
        case PacksActions.SET_PACKS_TOTAL_COUNT:
            return {...state, cardPacksTotalCount: action.payload};
        case PacksActions.SET_IS_MINE:
            return {...state, isMine: action.payload};
        default:
            return state;
    }
};

export default packsReducer;
