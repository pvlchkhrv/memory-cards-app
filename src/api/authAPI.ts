import {instance} from './instance';
import {
    AuthMeResponse,
    LoginPayload,
    LoginResponse,
    PingResponse,
    RegisterPayload,
    RegisterResponse, RestoreResponse, UpdateProfileResponse
} from '../store/reducers/auth/types';
const from = 'pvlchkhrv@gmail.com';
const message = `<div>password recover link: <a href='https://neko-back.herokuapp.com/2.0/set-new-password/$token$'>Link</a></div>`;

export const authAPI = {
    async ping() {
        const response = await instance.get<PingResponse>(`/ping/?frontTime=${Date.now()}`);
        return response.data;
    },
    async authMe() {
        const response = await instance.post<AuthMeResponse>('auth/me', {});
        return response.data;
    },
    async login(payload: LoginPayload) {
        const response = await instance.post<LoginResponse>('auth/login', payload);
        return response.data
    },
    logout() {
        return instance.delete('auth/me', {});
    },
    async register(payload: RegisterPayload) {
        const response = await instance.post<RegisterResponse>(`auth/register`, payload);
        return response.data;
    },
    async restorePassword(payload: { email: string }) {
        const response = await instance.post<RestoreResponse>('/auth/forgot', {...payload, from, message});
        return response.data;
    },
    setNewPassword(payload: { password: string, resetPasswordToken: string }) {
        return instance.post<ResponseType>('auth/new-password', payload);
    },
    updateProfile(payload: { name?: string, avatar?: string }) {
        return instance.put<UpdateProfileResponse>('auth/me', payload);
    }
};
