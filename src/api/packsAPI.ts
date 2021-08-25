import {GetPacksQueryParamsType, GetPacksResponseType, PackPayloadType} from '../types/packsTypes'
import {instance} from './instance'

const PACKS_URL = 'cards/pack'

const packsAPI = {
    async getPacks(queryParams: GetPacksQueryParamsType) {
        const response = await instance.get<GetPacksResponseType>(PACKS_URL, {params: queryParams})
        return response.data
    },
    addPack(payload: PackPayloadType) {
        return instance.post(PACKS_URL, {cardsPacks: payload})
    },
    removePack(id: string) {
        return instance.delete(PACKS_URL + `${id}`)
    },
    updatePack(payload: PackPayloadType) {
        return instance.put(PACKS_URL, {cardsPack: payload})
    },
}

export {
    packsAPI,
    PACKS_URL
}
