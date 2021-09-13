import {instance} from './instance'
import {GetPacksQueryParams, GetPacksResponse, PackPayload} from '../store/reducers/packs/types';

const PACKS_URL = 'cards/pack/';

const packsAPI = {
    async getPacks(queryParams: GetPacksQueryParams) {
        const response = await instance.get<GetPacksResponse>(PACKS_URL, {params: queryParams});
        return response.data;
    },
    addPack(payload: PackPayload) {
        return instance.post(PACKS_URL, {cardsPack: payload});
    },
    removePack(id: string) {
        return instance.delete(PACKS_URL, {params: {id}});
    },
    updatePack(payload: PackPayload) {
        return instance.put(PACKS_URL, {cardsPack: payload});
    },
};

export {
    packsAPI,
    PACKS_URL
};
