import {
    GetPacksQueryParamsType,
    PackPayloadType,
    PacksActions,
    PacksActionsType,
    PacksStateType,
} from '../../../types/packsTypes';
import {packsAPI} from '../../../api/packsAPI';
import {IPack} from '../../../models/IPack';
import {AppActionCreators} from '../app/action-creators';
import {AppDispatch} from '../../index';


const initState: PacksStateType = {
    packs: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    filter: '',
}

const packsReducer = (state = initState, action: PacksActionsType): PacksStateType => {
    switch (action.type) {
        case PacksActions.SET_PACKS:
            return {...state, packs: action.payload}
        case PacksActions.SET_PAGE_COUNT:
            return {...state, pageCount: action.pageCount}
        case PacksActions.SET_PAGE:
            return {...state, page: action.page}
        case PacksActions.SET_PACKS_TOTAL_COUNT:
            return {...state, cardPacksTotalCount: action.value}
        default:
            return state
    }
}

const setPacks = (payload: IPack[]) => ({type: PacksActions.SET_PACKS, payload}) as const
const setPageCount = (pageCount: number) => ({type: PacksActions.SET_PAGE_COUNT, pageCount}) as const
const setPage = (page: number) => ({type: PacksActions.SET_PAGE, page}) as const
const setCardPacksTotalCount = (value: number) => ({type: PacksActions.SET_PACKS_TOTAL_COUNT, value}) as const
const setFilter = (value: string) => ({type: PacksActions.FILTER_PACKS, value}) as const

const fetchPacks = (payload: GetPacksQueryParamsType) => async (dispatch: AppDispatch) => {
    dispatch(AppActionCreators.setAppStatus('loading'))
    try {
        const data = await packsAPI.getPacks(payload)
        dispatch(setPacks(data.cardPacks))
        dispatch(setPageCount(data.pageCount))
        dispatch(setCardPacksTotalCount(data.cardPacksTotalCount))
        dispatch(AppActionCreators.setAppStatus('succeed'))
    } catch (e) {
        dispatch(AppActionCreators.setAppError(e.response.data.error))
        dispatch(AppActionCreators.setAppStatus('failed'))
    }
}
const addPack = (payload: PackPayloadType) => async (dispatch: AppDispatch) => {
    dispatch(AppActionCreators.setAppStatus('loading'))
    try {
        await packsAPI.addPack(payload)
        dispatch(AppActionCreators.setAppStatus('succeed'))
    } catch (e) {
        dispatch(AppActionCreators.setAppError(e.response.data.error))
        dispatch(AppActionCreators.setAppStatus('failed'))
    }
}
const updatePack = (payload: PackPayloadType) => async (dispatch: AppDispatch) => {
    dispatch(AppActionCreators.setAppStatus('loading'))
    try {
        await packsAPI.updatePack(payload)
        dispatch(AppActionCreators.setAppStatus('succeed'))
    } catch (e) {
        dispatch(AppActionCreators.setAppError(e.response.data.error))
        dispatch(AppActionCreators.setAppStatus('failed'))
    }
}
const removePack = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(AppActionCreators.setAppStatus('loading'))
    try {
        await packsAPI.removePack(id)
        dispatch(AppActionCreators.setAppStatus('succeed'))
    } catch (e) {
        dispatch(AppActionCreators.setAppError(e.response.data.error))
        dispatch(AppActionCreators.setAppStatus('failed'))
    }
}

export {
    packsReducer,
    setPacks,
    setPageCount,
    setPage,
    setCardPacksTotalCount,
    setFilter,
    fetchPacks,
    addPack,
    updatePack,
    removePack
}
