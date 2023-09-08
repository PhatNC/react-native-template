import {PayloadAction} from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';
import {UserType, GET_USER_BY_ID} from './types/userTypes';
import {getUserErrorAction, getUserSuccessAction} from './slices/userSlice';
import {apiGetUserInfo} from '../apis/userApi';

// Generator function
function* getUserSaga({payload: id}: PayloadAction<string>) {
  try {
    // You can also export the axios call as a function.
    const response: AxiosResponse<UserType> = yield call(apiGetUserInfo, {id});
    yield put(getUserSuccessAction(response.data));
  } catch (error) {
    yield put(getUserErrorAction('error'));
  }
}

// Generator function
export function* watchGetUser() {
  yield takeLatest(GET_USER_BY_ID, getUserSaga);
}
