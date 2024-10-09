export type FetchErrorHandingOptions = {
  redirectUrl?: string,
  callback?: (() => Promise<any> | any) | null,
} 
