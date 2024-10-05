import { defineStore } from 'pinia';
import { useUserRepository } from '~/repository/user';
import type { UserLoginData } from '~/types/user';

export const useUserStore = defineStore('user', () => {
    const token = ref<string | null>(useCookie('access_token').value || null);

    const accessToken = computed(() => token.value || '');
    const isUserAuth = computed(() => !!token.value);

    async function login(payload: UserLoginData) {
        const data = await useUserRepository().login(payload);

        token.value = data?.value?.token ?? null;

        if (token.value) {
            useCookie('access_token', {sameSite: true, expires: new Date(new Date().setHours(24))}).value = token.value;
        }

        return !!token.value;
    }

    function logout() {
        token.value = null;
        useCookie('access_token').value = '';
    }

    return {
        accessToken,
        isUserAuth,
        login,
        logout,
    };
});
