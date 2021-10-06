import {instance} from './instance'
import {CardPayload, CardsState, GetCardsQueryParams} from '../store/reducers/cards/types';

const CARDS_URL = 'cards/card';

const cardsAPI = {
    async getCards(queryParams: GetCardsQueryParams) {
        const response = await instance.get<CardsState>(CARDS_URL, {params: queryParams});
        return response.data;
    },
    addCard(payload: CardPayload) {
        return instance.post(CARDS_URL, {card: payload});
    },
    removeCard(id: string) {
        return instance.delete(CARDS_URL, {params: {id}});
    },
    updateCard(payload: CardPayload) {
        return instance.put(CARDS_URL, {card: payload});
    },
    estimateCard(payload: {grade: number | null, card_id: string}) {
        return instance.put('cards/grade', payload)
    }
};

export {
    cardsAPI,
    CARDS_URL
};
