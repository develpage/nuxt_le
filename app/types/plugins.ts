export type FetchErrorHandingOptions = {
  statusCode?: number,
  statusMessage?: string,
  redirectUrl?: string,
  callback?: () => Promise<any> | any,
} 
