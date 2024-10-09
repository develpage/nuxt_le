export const ERRORS_LIST = [
  {
    statusCode: 401,
    statusMessage: 'Unauthorized',
    isErrorShow: false,
  },
  {
    statusCode: 403,
    statusMessage: 'Forbidden',
    isErrorShow: false,
  },
  {
    statusCode: 404,
    statusMessage: 'Not found',
    isErrorShow: true,
  },
  {
    statusCode: 422,
    statusMessage: 'Unprocessable Entity',
    isErrorShow: false,
  },
  {
    statusCode: 500,
    statusMessage: 'Internal server error',
    isErrorShow: false,
  },
  {
    statusCode: 503,
    statusMessage: 'Service unavailable',
    isErrorShow: false,
  },
];

export function defineHttpError(status: number | null = null) {
  if (status === null) {
    return null;
  }

  return ERRORS_LIST.find(({statusCode}) => statusCode === status) || null;
}
