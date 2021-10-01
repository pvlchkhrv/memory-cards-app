import {ICard} from '../../../models/ICard';


interface CardsState {
    cards: ICard[];
    cardsTotalCount: number;
    maxGrade: number;
    minGrade: number;
    page: number;
    pageCount: number;
    packUserId: string; // id юзера, создавшего колоду
}

interface GetCardsQueryParams {
    cardAnswer?: string;
    cardQuestion?: string;
    min?: number;
    max?: number;
    cardsPack_id: string;
    pageCount?: number;
    page?: number;
    sortCards?: string;
}

interface CardPayload {
    cardsPack_id: string;
    question?: string;
    answer?: string;
    grade?: number;
    shots?: number;
    rating?: number;
    answerImg?: string;
    questionImg?: string;
    questionVideo?: string;
    answerVideo?: string;
    type?: string;
}

export enum CardsActions {
    SET_CARDS = 'SET_CARDS',
    SET_CARDS_PAGE_COUNT = 'SET_CARDS_PAGE_COUNT',
    SET_CARDS_PAGE = 'SET_CARDS_PAGE',
    SET_CARDS_TOTAL_COUNT = 'SET_CARDS_TOTAL_COUNT',
}

interface SetCards {
    type: CardsActions.SET_CARDS;
    payload: ICard[];
}

interface SetCardsPageCount {
    type: CardsActions.SET_CARDS_PAGE_COUNT;
    payload: number;
}

interface SetCardsPage {
    type: CardsActions.SET_CARDS_PAGE;
    payload: number;
}

interface SetCardsTotalCount {
    type: CardsActions.SET_CARDS_TOTAL_COUNT;
    payload: number;
}

type CardsAction =
    | SetCards
    | SetCardsPage
    | SetCardsPageCount
    | SetCardsTotalCount

export type {
    CardsState,
    GetCardsQueryParams,
    CardPayload,
    CardsAction,
    SetCards,
    SetCardsPage,
    SetCardsPageCount,
    SetCardsTotalCount
};
