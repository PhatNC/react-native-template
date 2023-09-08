import moment from 'moment';

interface IResponseCode {
  [key: string]: any;
}

export const RESPONSE_CODE: IResponseCode = {
  FORBIDDEN: '403',
  NOT_FOUND: '404',
  TIME_OUT: '408',
  UNAUTHORIZED_STATUS: '401',
};

export function convertTimeString(timeString: Date) {
  if (timeString) {
    return moment(new Date(timeString)).format('HH:mm, DD/MM/YYYY');
  }
  return moment().format('HH:mm, DD/MM/YYYY');
}
interface IErrorObject {
  code: string;
  message: string;
  data: any;
  status: number;
}

function convertDataError(error: IErrorObject, msg: string) {
  let {code, message, data, status} = error;
  switch (status) {
    case RESPONSE_CODE.NOT_FOUND:
      code = RESPONSE_CODE.NOT_FOUND;
      break;
  }

  let result = RESPONSE_CODE[code];
  if (result) {
    return {
      code: data && data.code,
      message: msg ? msg + result : result,
      status,
    };
  }

  if (message && message.search('Cannot read property') >= 0) {
    return {
      code: RESPONSE_CODE.UNDEFINED,
      message: 'errMessage.query_error',
      status,
    };
  }
  if (code === 'auth/network-request-failed') {
    return {
      code: RESPONSE_CODE.NOT_FOUND,
      message: 'errMessage.network_error',
      status,
    };
  }
  if (
    (message && message.search('Network Error') >= 0) ||
    (msg && msg.search('Network Error') >= 0)
  ) {
    return {
      code: RESPONSE_CODE.NOT_FOUND,
      message: 'errMessage.network_error',
      status,
    };
  }
  return {
    code: code || (data && data?.error?.code),
    message:
      message ||
      (data && (data.message || data?.error?.message)) ||
      'errMessage.error_tryAgain',
    status,
  };
}

export function handleErrorMessage(err: any, msg?: any) {
  const {response} = err;
  if (response) {
    return convertDataError(response, msg);
  } else {
    return convertDataError(err, msg);
  }
}
