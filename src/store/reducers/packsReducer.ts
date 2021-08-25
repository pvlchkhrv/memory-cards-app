import {
    GetPacksQueryParamsType,
    PackPayloadType,
    PacksActions,
    PacksActionsType,
    PacksStateType,
    PackType
} from '../../types/packsTypes';
import {AppThunkType} from '../index';
import {setAppError, setAppStatus} from './appReducer';
import {packsAPI} from '../../api/packsAPI';


const initState: PacksStateType  = {
    packs: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 10
}

const packsReducer = (state = initState, action: PacksActionsType): PacksStateType => {
    switch (action.type) {
        case PacksActions.SET_PACKS:
            return {...state, packs: action.payload}
        default:
            return state
    }
}

const setPacks = (payload: PackType []) => ({type: PacksActions.SET_PACKS, payload}) as const

const fetchPacks = (payload: GetPacksQueryParamsType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const data = await packsAPI.getPacks(payload)
        dispatch(setPacks(data.cardPacks))
        dispatch(setAppStatus('succeed'))
    } catch (e) {
        dispatch(setAppError(e.response.data.error))
        dispatch(setAppStatus('failed'))
    }
}
const addPack = (payload: PackPayloadType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        await packsAPI.addPack(payload)
        dispatch(setAppStatus('succeed'))
    } catch (e) {
        dispatch(setAppError(e.response.data.error))
        dispatch(setAppStatus('failed'))
    }
}
const updatePack = (payload: PackPayloadType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        await packsAPI.updatePack(payload)
        dispatch(setAppStatus('succeed'))
    } catch (e) {
        dispatch(setAppError(e.response.data.error))
        dispatch(setAppStatus('failed'))
    }
}
const removePack = (id: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        await packsAPI.removePack(id)
        dispatch(setAppStatus('succeed'))
    } catch (e) {
        dispatch(setAppError(e.response.data.error))
        dispatch(setAppStatus('failed'))
    }
}
export {
    packsReducer,
    setPacks,
    fetchPacks,
    updatePack,
    removePack
}
