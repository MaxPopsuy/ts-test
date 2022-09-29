import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { NotificationManager } from 'react-notifications';
import { RootState } from '../selectors';
import axios from 'axios';

import {
  USER_LOGIN,
  USER_REGISTER,
  USER_LOGOUT,
  USER_REFRESH,
} from './auth-types';

import { register, login, getCurrent } from '../../utils/fetchApi';

const token = {
  setToken(token: string) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  },
  unSetToken() {
    axios.defaults.headers.common.authorization = '';
  },
};

interface UserData {
  fullName: string;
  email: string;
  password: string;
}
interface UserLoginData {
  email: string;
  password: string;
}

const registerUser = createAsyncThunk<UserData, UserData, { state: RootState }>(
  USER_REGISTER,
  (data: UserData, { rejectWithValue }) => {
    console.log(data);
    return register(data)
      .then((data) => {
        NotificationManager.success(
          `Great, user ${data.user.fullName} has successfully registered :)`
        );
        token.setToken(data.token);
        return data;
      })
      .catch((data) => {
        NotificationManager.error(
          `We have a problem ${data.message}, please try again`
        );
        return rejectWithValue(data.message);
      });
  }
);

const loginUser = createAsyncThunk<UserLoginData, UserLoginData, { state: RootState }>(
  USER_LOGIN,
  (data: UserLoginData, { rejectWithValue }) => {
    return login(data)
      .then((data) => {
        NotificationManager.success(
          `Great, user ${data.user.fullName} has successfully authorized :)`
        );
        token.setToken(data.token);
        return data;
      })
      .catch((data) => {
        NotificationManager.error(
          `We have a problem ${data.message}, please try again`
        );
        return rejectWithValue(data.message);
      });
  }
);
interface EndpointAuth {
  token: string;
}

interface Endpoint {
  auth: EndpointAuth;
}
const getCurrentUser = createAsyncThunk<UserData, void, { state: RootState }>(
  USER_REFRESH,
  (_, { rejectWithValue, getState }) => {
    const {
      auth: { token: persistedToken },
    } = getState();
    console.log(persistedToken);
    if (!persistedToken) return rejectWithValue('Non authorized 401');
    token.setToken(persistedToken);
    return getCurrent()
      .then((data) => {
        NotificationManager.success(`User ${data.fullName} authorized :)`);
        return data;
      })
      .catch((data) => {
        NotificationManager.error(
          `We have a problem ${data.message}, please try again`
        );
        return rejectWithValue(data.message);
      });
  }
);

const logoutUser = createAction(USER_LOGOUT, () => {
  token.unSetToken();
  return {
    payload: null,
  };
});

export { registerUser, loginUser, getCurrentUser, logoutUser };
