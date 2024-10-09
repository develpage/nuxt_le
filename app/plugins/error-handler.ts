import type { NuxtError } from '#app';
import { FetchError } from 'ofetch';
import type { FetchErrorHandingOptions } from '~/types/plugins';

export default defineNuxtPlugin((nuxtApp) => {
  const errorHandler = async (
    processor: Promise<any> | NuxtError | FetchError,
    options: FetchErrorHandingOptions = {},
  ) => {
    if (!processor) {
      console.error(`errorHanding: argument processor must be promise function or error object`);

      return;
    }

    if (processor instanceof Promise) {
      // const promise = (processor as () => Promise<any>)()
      //   .catch((error: FetchError | any) => {
          

      //     throw error;
      //   }
      // )
      // .finally(() => {
      //   if (typeof options.callback === 'function') {
      //     options.callback();
      //   }
      // })


      const response = await processor.catch(error => error);

      console.log('response :>> ', response);

      if (response?.response?.ok === false) {
        console.log('123213 :>> ', 123213);
        const {statusCode, statusMessage} = response;
          if (statusCode === 404) {
            console.log('123213 :>> ', 123213);
            if (import.meta.server) {
              console.log('123213 :>> ', 123213);
              // Не работает на серверной стороне, или в контекст вызова не подходит
              nuxtApp.runWithContext(() => {
                showError({
                  statusCode,
                  statusMessage,
                  fatal: true,
                });
              });
              // showError({
              //   statusCode,
              //   statusMessage,
              //   fatal: true,
              // });

              // await createError({ 
              //   statusCode: response.status,
              //   statusMessage: JSON.stringify(response),
              //   fatal: true,
              // });
            } else {
              showError(response);
            }
          }
      }

      // console.dir(error);

      return processor;
    }
    
    if (
      typeof processor === 'object'
      || !Object.keys(processor).length
    ) {
      return showError(processor);
    }

  }

  return { 
    provide: {
      errorHandler,
    },
  };
});
