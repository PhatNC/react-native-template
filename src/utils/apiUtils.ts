import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {handleErrorMessage} from '../helpers/handleError';
import store from '../store/store';

const skipTokenUrl: any = [];
const REQUEST_TIMEOUT = 60000;

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  async config => {
    let token: string | undefined | null = await AsyncStorage.getItem(
      'ACCESS_TOKEN',
    );
    !token ? (token = store?.getState()?.auth?.token) : null;

    if (token && skipTokenUrl.indexOf(config.url) === -1) {
      config.headers.authorization = 'Bearer ' + token;
    } else {
      config.headers.authorization = null;
    }
    return config;
  },
  error => {
    return handleErrorMessage(error);
  },
);

// interceptor to handle refresh token
axios.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log('errorvvvv ==>', {error});

    if (!error.response) {
      return handleErrorMessage({}, 'Network Error');
    }
    return handleErrorMessage(error);
  },
);

export default class APIUtils {
  static get(uri: string, params: any, headers?: any) {
    return new Promise((resolve, reject) =>
      axios
        .get(uri, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'text/plain',
            ...headers,
          },
          timeout: REQUEST_TIMEOUT,
          params,
        })
        .then(response => {
          // console.log('>>>>>>> Response>>>>>> : ', response);
          //  const { data } = response;
          resolve(response);
        })
        .catch(err => {
          reject(handleErrorMessage(err));
        }),
    );
  }

  static getWithoutAcceptText(uri: string, params: any, headers?: any) {
    return new Promise((resolve, reject) =>
      axios
        .get(uri, {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            ...headers,
          },
          timeout: REQUEST_TIMEOUT,
          params,
        })
        .then(response => {
          console.log('>>>>>>> Response>>>>>> : ', response);
          //  const { data } = response;
          resolve(response);
        })
        .catch(err => {
          reject(handleErrorMessage(err));
        }),
    );
  }

  static post(uri: string, postData: any, headers?: any) {
    return new Promise((resolve, reject) => {
      axios
        .post(uri, postData, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
        })
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          //  console.log('[error]', { err });
          console.log('errr 3', {err});
          reject(handleErrorMessage(err));
        });
    });
  }

  static delete(uri: string, deleteBody: any, headers?: any) {
    console.log('deleteBody', deleteBody);
    return new Promise((resolve, reject) => {
      axios
        .delete(uri, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          data: deleteBody,
        })
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          //  console.log('[error]', { err });
          console.log('errr 4', {err});
          reject(handleErrorMessage(err));
        });
    });
  }

  static postFormData(uri: string, postData: any, headers?: any) {
    console.log('>>>>>>> Request>>>>>> : ', postData);
    return new Promise((resolve, reject) => {
      axios
        .post(uri, postData, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            'Content-Type': 'multipart/form-data',
            ...headers,
          },
        })
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          console.log('[error 5]', {err});
          reject(handleErrorMessage(err));
        });
    });
  }

  static put(uri: string, updateData: any) {
    return new Promise((resolve, reject) =>
      axios
        .put(uri, updateData, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: REQUEST_TIMEOUT,
        })
        .then(response => {
          //  const { data } = response;
          console.log('response', response);
          resolve(response);
        })
        .catch(err => {
          console.log('err', err);

          // console.log('[error]', { err });
          reject(handleErrorMessage(err));
        }),
    );
  }

  static getMultiple(listGetRequest: any) {
    return new Promise((resolve, reject) => {
      axios
        .all(listGetRequest)
        .then(
          axios.spread((...responses) => {
            resolve(responses);
          }),
        )
        .catch(errors => {
          reject(handleErrorMessage(errors));
        });
    });
  }

  static postFirebase = (uri: string, postData: any, headers?: any) => {
    let config = {
      method: 'post',
      url: uri,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: postData,
    };

    return new Promise((resolve, reject) => {
      axios(config)
        .then(response => {
          console.log('responseFB', response);
          resolve(response);
        })
        .catch(err => {
          //  console.log('[error]', { err });
          console.log('errr 3', {err});
          reject(handleErrorMessage(err));
        });
    });
  };
}
