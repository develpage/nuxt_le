export default defineNuxtPlugin((nuxtApp) => {
    const api = $fetch.create({
      baseURL: useRuntimeConfig().public.apiBaseUrl,
      onRequest({ options }) {
        const metadataObject: Record<string, string> = {
            'Accept': 'application/json',
        };

        if (useUserStore().accessToken) {
            metadataObject['Authorization'] = `Bearer ${useUserStore().accessToken}`;
        }

        for (const key in metadataObject) {
            options.headers.set(key, metadataObject[key] as string);
        }
      },
      async onResponseError({ response }) {
        if (response.status === 401) {
          await nuxtApp.runWithContext(() => navigateTo('/login'))
        }
      },
    });
  
    return {
      provide: {
        api,
      },
    };
  });
