import {CardsAction, CardsActions, CardsState} from './types';

const initState: CardsState = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 10,
    packUserId: ''
}

const cardsReducer = (state = initState, action: CardsAction): CardsState => {
    switch (action.type) {
        case CardsActions.SET_CARDS:
            return {...state, cards: action.payload};
        case CardsActions.SET_CARDS_PAGE_COUNT:
            return {...state, pageCount: action.payload};
        case CardsActions.SET_CARDS_PAGE:
            return {...state, page: action.payload};
        case CardsActions.SET_CARDS_TOTAL_COUNT:
            return {...state, cardsTotalCount: action.payload};
        default:
            return state;
    }
};

export default cardsReducer;
