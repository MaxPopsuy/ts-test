import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { RootState } from '../selectors';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from './auth-operations';

const initialState = {
  id: null,
  fullName: null,
  email: null,
  createdAt: null,
};

interface Arg {
  email: string;
  password: string;
}

interface Meta {
  arg: Arg;
  requestId: string;
  requestStatus: string;
}

interface User {
  createdAt: string;
  id: string;
  fullName: string;
  email: string;
}

interface PayloadUser {
  token: string;
  user: User;
}

interface UserAction {
  type: string;
  payload: PayloadUser;
  meta: Meta;
}

const user = createReducer(initialState, {
  [registerUser.fulfilled]: (_: RootState, action: UserAction) => {
    console.log(action);
    return action.payload.user;
  },
  [loginUser.fulfilled]: (_, action) => {
    console.log(action);
    return action.payload.user;
  },
  [getCurrentUser.fulfilled]: (_, action) => action.payload,
  [logoutUser]: () => initialState,
});

const token = createReducer('', {
  [registerUser.fulfilled]: (_, action) => action.payload.token,
  [loginUser.fulfilled]: (_, action) => action.payload.token,
  [logoutUser]: () => null,
});

const isAuthenticated = createReducer(false, {
  [registerUser.fulfilled]: () => true,
  [loginUser.fulfilled]: () => true,
  [getCurrentUser.fulfilled]: () => true,
  [logoutUser]: () => false,
  [registerUser.rejected]: () => false,
  [loginUser.rejected]: () => false,
  [getCurrentUser.rejected]: () => false,
});

export default combineReducers({
  user,
  token,
  isAuthenticated,
});
