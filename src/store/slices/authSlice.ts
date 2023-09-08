import AsyncStorage from '@react-native-async-storage/async-storage';
import {PayloadAction, createSlice, nanoid} from '@reduxjs/toolkit';

interface AuthState {
  token?: string;
}

const initialState: AuthState = {
  token: undefined,
};

const registeredAccount = {
  username: 'UITTogether',
  password: 'UIT2023',
};

interface IUserInfo {
  username: string;
  password: string;
}

const authSlide = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserInfo>) => {
      console.log('state :>> ', state, action);

      const {username, password} = action.payload;

      if (
        username == registeredAccount.username &&
        password == registeredAccount.password
      ) {
        const token = nanoid();

        state.token = token;
        AsyncStorage.setItem('TOKEN', token).catch(error => {
          console.error('Error storing token: ', error);
        });
      }
    },
    logout: state => {
      console.log('state :>> ', state);
    },
  },
});

export const {login, logout} = authSlide.actions;
export default authSlide.reducer;
