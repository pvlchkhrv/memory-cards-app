import {CardsState} from './types';
import {ICard} from '../../../models/IСard';
import {CardsActionCreators} from './cards-action-creators';
import cardsReducer from './index';

let startState: CardsState;

const generateCards = (): ICard[] => {
    const cards = []
    for (let i = 0; i < 10; i++) {
        cards.push({
            answer: `Cards answer # ${i}`,
            question: '',
            cardsPack_id: i.toString(),
            grade: 0,
            rating: 0,
            shots: 1,
            type: 'card',
            user_id: i.toString(),
            created: String(Date.now()),
            updated: String(Date.now()),
            __v: 0,
            _id: i.toString(),
        })
    }
    return cards;
}

beforeEach(() => {
    startState = {
        cards: [],
        cardsTotalCount: 0,
        maxGrade: 0,
        minGrade: 0,
        page: 1,
        pageCount: 10,
        packUserId: '21'
    }
});

describe('check if cardsReducer implements correctly', () => {
    it('Cards array should be set', () => {
        const cards = generateCards();
        const output = cardsReducer(startState, CardsActionCreators.setCards(cards));
        expect(output.cards[0]._id).toBe('0');
        expect(output.cards[1].answer).toBe('Cards answer # 1');
        expect(output.cards[1]).toHaveProperty('user_id');
    })
    it('page should be changed', () => {
        const output = cardsReducer(startState, CardsActionCreators.setPage(5));
        expect(output.page).toBe(5);
    })
    it('pageCount should be changed', () => {
        const output = cardsReducer(startState, CardsActionCreators.setCardsPageCount(10));
        expect(output.pageCount).toBe(10);
    })
    it('total cards count should be changed', () => {
        const output = cardsReducer(startState, CardsActionCreators.setCardsTotalCount(100));
        expect(output.cardsTotalCount).toBe(100);
    })
})
