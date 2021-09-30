import {IPack} from '../../../models/IPack';
import {
    GetPacksQueryParams,
    PackPayload,
    PacksActions, SetCardsQuantity,
    SetIsMine,
    SetPacks,
    SetPacksTotalCount,
    SetPage,
    SetPageCount
} from './types';
import {AppDispatch} from '../../index';
import {AppActionCreators} from '../app/action-creators';
import {packsAPI} from '../../../api/packsAPI';

export const PacksActionCreators = {
    setPacks: (payload: IPack[]): SetPacks => ({type: PacksActions.SET_PACKS, payload}),
    setPageCount: (payload: number): SetPageCount => ({type: PacksActions.SET_PAGE_COUNT, payload}),
    setPage: (payload: number): SetPage => ({type: PacksActions.SET_PAGE, payload}),
    setCardPacksTotalCount: (payload: number): SetPacksTotalCount => ({
        type: PacksActions.SET_PACKS_TOTAL_COUNT,
        payload
    }),
    setIsMine: (payload: boolean): SetIsMine => ({type: PacksActions.SET_IS_MINE, payload}),
    setCardsQuantity: (payload: { max: number, min: number }): SetCardsQuantity => ({
        type: PacksActions.SET_CARDS_QUANTITY,
        payload
    }),
    fetchPacks: (payload: GetPacksQueryParams) => async (dispatch: AppDispatch) => {
        dispatch(AppActionCreators.setAppStatus('loading'));
        try {
            const data = await packsAPI.getPacks(payload);
            dispatch(PacksActionCreators.setPacks(data.cardPacks));
            dispatch(PacksActionCreators.setPageCount(data.pageCount));
            dispatch(PacksActionCreators.setCardPacksTotalCount(data.cardPacksTotalCount));
            dispatch(AppActionCreators.setAppStatus('succeed'));
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in console');
            dispatch(AppActionCreators.setAppError(error));
            dispatch(AppActionCreators.setAppStatus('failed'));
        }
    },
    addPack: (payload: PackPayload) => async (dispatch: AppDispatch) => {
        dispatch(AppActionCreators.setAppStatus('loading'));
        try {
            await packsAPI.addPack(payload);
            dispatch(AppActionCreators.setAppStatus('succeed'));
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in console');
            dispatch(AppActionCreators.setAppError(error));
            dispatch(AppActionCreators.setAppStatus('failed'));
        }
    },
    updatePack: (payload: PackPayload) => async (dispatch: AppDispatch) => {
        dispatch(AppActionCreators.setAppStatus('loading'));
        try {
            await packsAPI.updatePack(payload);
            dispatch(AppActionCreators.setAppStatus('succeed'));
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in console');
            dispatch(AppActionCreators.setAppError(error));
            dispatch(AppActionCreators.setAppStatus('failed'));
        }
    },
    removePack: (id: string) => async (dispatch: AppDispatch) => {
        dispatch(AppActionCreators.setAppStatus('loading'));
        try {
            await packsAPI.removePack(id);
            dispatch(AppActionCreators.setAppStatus('succeed'));
        } catch (e) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in console');
            dispatch(AppActionCreators.setAppError(error));
            dispatch(AppActionCreators.setAppStatus('failed'));
        }
    },
}
