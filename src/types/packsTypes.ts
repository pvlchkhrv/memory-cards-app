import {setCardPacksTotalCount, setPacks, setPage, setPageCount} from '../store/reducers/packs/packsReducer';
import {IPack} from '../models/IPack';

export type GetPacksResponseType = {
    cardPacks: IPack[];
    page: number;
    pageCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    cardPacksTotalCount: number;
}
export type GetPacksQueryParamsType = {
    packName?: string;
    min?: number
    max?: number
    page: number
    pageCount: number
    user_id?: string
    sortPacks?: string
}
export type PacksStateType = {
    packs: IPack[];
    cardPacksTotalCount: number;
    maxCardsCount: number;
    minCardsCount: number;
    page: number;
    pageCount: number;
    filter: string;
}

export enum PacksActions {
    SET_PACKS = 'SET_PACKS',
    SET_PAGE_COUNT = 'SET_PAGE_COUNT',
    SET_PAGE = 'SET_PAGE',
    SET_PACKS_TOTAL_COUNT = 'SET_PACKS_TOTAL_COUNT',
    FILTER_PACKS = 'FILTER_PACKS',
}

export type PackPayloadType = {
    _id?: string
    name?: string
    path?: string
    private?: boolean
    type?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
}

export type PacksActionsType =
    | ReturnType<typeof setPacks>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setCardPacksTotalCount>
