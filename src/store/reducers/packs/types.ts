import {IPack} from '../../../models/IPack';

interface PacksState {
    packs: IPack[];
    cardPacksTotalCount: number;
    maxCardsCount: number;
    minCardsCount: number;
    page: number;
    pageCount: number;
    filter: string;
}

interface GetPacksResponse {
    cardPacks: IPack[];
    page: number;
    pageCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    cardPacksTotalCount: number;
}

interface GetPacksQueryParams {
    packName?: string;
    min?: number;
    max?: number;
    page: number;
    pageCount: number;
    user_id?: string;
    sortPacks?: string;
}

interface PackPayload {
    _id?: string;
    name?: string;
    path?: string;
    private?: boolean;
    type?: string;
    grade?: number;
    shots?: number;
    rating?: number;
    deckCover?: string;
}

export enum PacksActions {
    SET_PACKS = 'SET_PACKS',
    SET_PAGE_COUNT = 'SET_PAGE_COUNT',
    SET_PAGE = 'SET_PAGE',
    SET_PACKS_TOTAL_COUNT = 'SET_PACKS_TOTAL_COUNT',
    FILTER_PACKS = 'FILTER_PACKS',
}

interface SetPacks {
    type: PacksActions.SET_PACKS;
    payload: IPack[];
}

interface SetPageCount {
    type: PacksActions.SET_PAGE_COUNT;
    payload: number;
}

interface SetPage {
    type: PacksActions.SET_PAGE;
    payload: number;
}

interface SetPacksTotalCount {
    type: PacksActions.SET_PACKS_TOTAL_COUNT;
    payload: number;
}


type PacksAction =
    | SetPacks
    | SetPageCount
    | SetPage
    | SetPacksTotalCount

export type {
    PacksState,
    GetPacksResponse,
    GetPacksQueryParams,
    PackPayload,
    SetPacks,
    SetPageCount,
    SetPage,
    SetPacksTotalCount,
    PacksAction
}
