import type { UserLoginData } from '~/types/user';

export const useUserRepository = () => {
    async function login(payload: UserLoginData) {
        const {data} = await useAPI<LoginResponseData>('auth/login', {method: 'POST', body: JSON.stringify(payload)});

        return data;
    } 

    return {
        login,
    };
};

export interface LoginResponseData {
    user: UserData;
    token: string;
}

export interface UserData {
    id: number
    login: string
    createdAt: string
    updatedAt: string
}
  
