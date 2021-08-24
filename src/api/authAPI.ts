import {instance} from './instance';
import {
    AuthMeResponseType, LoginPayloadType,
    LoginResponseType,
    PingResponseType, RegisterPayloadType,
    RegisterResponseType,
    RestoreResponseType,
    UpdateProfileResponseType
} from '../types/authTypes'

const from = 'pvlchkhrv@gmail.com'
const message = `<div>password recover link: <a href='https://neko-back.herokuapp.com/2.0/set-new-password/$token$'>Link</a></div>`

export const authAPI = {
    async ping() {
        const response = await instance.get<PingResponseType>(`/ping/?frontTime=${Date.now()}`)
        return response.data
    },
    async authMe() {
        const response = await instance.post<AuthMeResponseType>('auth/me', {})
        return response.data
    },
    async login(payload: LoginPayloadType) {
        const response = await instance.post<LoginResponseType>('auth/login', {...payload})
        return response.data
    },
    logout() {
        return instance.delete('auth/me', {});
    },
    async register(payload: RegisterPayloadType) {
        const response = await instance.post<RegisterResponseType>(`auth/register`, {...payload})
        return response.data
    },
    async restorePassword(payload: { email: string }) {
        const response = await instance.post<RestoreResponseType>('/auth/forgot', {...payload, from, message})
        return response.data
    },
    setNewPassword(payload: { password: string, resetPasswordToken: string }) {
        return instance.post<ResponseType>('auth/new-password', {...payload})
    },
    updateProfile(payload: { name?: string, avatar?: string }) {
        return instance.put<UpdateProfileResponseType>('auth/me', {...payload})
    }
};
