import AsyncStorage from '@react-native-async-storage/async-storage';
import {PayloadAction, createSlice, nanoid} from '@reduxjs/toolkit';
import {USERS, UserType, UsersStateType} from '../types/userTypes';

const usersInitialState: UsersStateType = {
  user: {
    data: null,
    isLoading: false,
    errors: '',
  },
};

const usersSlice = createSlice({
  name: USERS,
  initialState: usersInitialState,
  reducers: {
    /* This action will trigger our saga middleware
         and set the loader to true and reset error message.
      */
    getUserAction: (
      state: UsersStateType,
      {payload: id}: PayloadAction<string>,
    ) => {
      state.user.isLoading = true;
      state.user.errors = '';
    },
    getUserSuccessAction: (
      state: UsersStateType,
      {payload: user}: PayloadAction<UserType>,
    ) => {
      state.user.isLoading = false;
      state.user.data = user;
    },
    getUserErrorAction: (
      state: UsersStateType,
      {payload: error}: PayloadAction<string>,
    ) => {
      state.user.isLoading = false;
      state.user.errors = error;
    },
  },
});

export const {getUserAction, getUserSuccessAction, getUserErrorAction} =
  usersSlice.actions;
export default usersSlice.reducer;
