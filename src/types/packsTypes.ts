import {setPacks} from '../store/reducers/packsReducer';

export type PackType = {
    _id: string
    user_id: string
    name: string
    path: string // папка	,
    cardsCount: number
    grade: number // средняя оценка карточек
    shots: number // количество попыток			приватные колоды будут
    rating: number // лайки	только если указать свой
    type: string
    created: string
    updated: string
    __v: number
}

export type GetPacksResponseType = {
    cardPacks: PackType[]
    page: number
    pageCount: number
    minCardsCount: number
    maxCardsCount: number
    cardPacksTotalCount: number
}
export type GetPacksQueryParamsType = {
    packName?: string;
    min?: number
    max?: number
    page?: number
    pageCount?: number
    user_id?: string
    sortPacks?: string
}
export type PacksStateType = {
    packs: PackType []
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export enum PacksActions {
    SET_PACKS = 'SET_PACKS'
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
