import type { NuxtError } from '#app';
import { FetchError } from 'ofetch';
import type { FetchErrorHandingOptions } from '~/types/plugins';
import { defineHttpError } from '~/utils/defineHttpError';

export default defineNuxtPlugin((nuxtApp) => {
  const errorHandler = async (
    processor: Promise<any> | NuxtError | FetchError,
    options: FetchErrorHandingOptions = {
      redirectUrl: '',
      callback: null,
    },
  ) => {
    if (!processor) {
      console.error(`errorHanding: argument processor must be promise function or error object`);

      return;
    }

    if (processor instanceof Promise) {
      const result = await processor.catch(error => error);
      const definedError = defineHttpError(result?.statusCode);

      if (definedError && result?.response?.ok === false) {
        const {statusCode, statusMessage} = result;

          if (definedError.isErrorShow) {
            if (import.meta.server) {
              nuxtApp.runWithContext(() => {
                if (!!options.redirectUrl) {
                  navigateTo(options.redirectUrl);
                } else {
                  showError({
                    statusCode,
                    statusMessage,
                    fatal: true,
                  });
                }

                if (typeof options.callback === 'function') {
                  options.callback();
                }
              });
            } else {
              if (!!options.redirectUrl) {
                navigateTo(options.redirectUrl);
              } else {
                showError(result);
              }
              
              if (typeof options.callback === 'function') {
                options.callback();
              }
            }
          }
      }

      return processor;
    }
    
    if (typeof processor === 'object' && !!defineHttpError(processor.statusCode)) {
      if (!!options.redirectUrl) {
        navigateTo(options.redirectUrl);
      } else {
        showError(processor);
      }

      if (typeof options.callback === 'function') {
        options.callback();
      }
    }

  }

  return { 
    provide: {
      errorHandler,
    },
  };
});
