
import {AppActionCreators} from '../app/action-creators';
import {AppDispatch} from '../../index';
import {
    CardPayload,
    CardsActions,
    GetCardsQueryParams,
    SetCards,
    SetCardsPage,
    SetCardsPageCount,
    SetCardsTotalCount
} from './types';
import {cardsAPI} from '../../../api/cardsAPI';
import {ICard} from '../../../models/ICard';

export const CardsActionCreators = {
    setCards: (payload: ICard[]): SetCards => ({type: CardsActions.SET_CARDS, payload}),
    setCardsPageCount: (payload: number): SetCardsPageCount => ({type: CardsActions.SET_CARDS_PAGE_COUNT, payload}),
    setCardPage: (payload: number): SetCardsPage => ({type: CardsActions.SET_CARDS_PAGE, payload}),
    setCardsTotalCount: (payload: number): SetCardsTotalCount => ({type: CardsActions.SET_CARDS_TOTAL_COUNT, payload}),
    fetchCards: (payload: GetCardsQueryParams) => async (dispatch: AppDispatch) => {
        dispatch(AppActionCreators.setAppStatus('loading'));
        try {
            const data = await cardsAPI.getCards(payload);
            dispatch(CardsActionCreators.setCards(data.cards));
            dispatch(CardsActionCreators.setCardsPageCount(data.pageCount));
            dispatch(CardsActionCreators.setCardsTotalCount(data.cardsTotalCount));
            dispatch(AppActionCreators.setAppStatus('succeed'));
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in console');
            dispatch(AppActionCreators.setAppError(error));
            dispatch(AppActionCreators.setAppStatus('failed'));
        }
    },
    addCard: (payload: CardPayload) => async (dispatch: AppDispatch) => {
        dispatch(AppActionCreators.setAppStatus('loading'));
        try {
            await cardsAPI.addCard(payload);
            dispatch(AppActionCreators.setAppStatus('succeed'));
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in console');
            dispatch(AppActionCreators.setAppError(error));
            dispatch(AppActionCreators.setAppStatus('failed'));
        }
    },
    updateCard: (payload: CardPayload) => async (dispatch: AppDispatch) => {
        dispatch(AppActionCreators.setAppStatus('loading'));
        try {
            await cardsAPI.updateCard(payload);
            dispatch(AppActionCreators.setAppStatus('succeed'));
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in console');
            dispatch(AppActionCreators.setAppError(error));
            dispatch(AppActionCreators.setAppStatus('failed'));
        }
    },
    removeCard: (id: string) => async (dispatch: AppDispatch) => {
        dispatch(AppActionCreators.setAppStatus('loading'));
        try {
            await cardsAPI.removeCard(id);
            dispatch(AppActionCreators.setAppStatus('succeed'));
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in console');
            dispatch(AppActionCreators.setAppError(error));
            dispatch(AppActionCreators.setAppStatus('failed'));
        }
    },
}
