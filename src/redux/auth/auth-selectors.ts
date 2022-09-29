import { RootState } from "../selectors";

const getIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
const getUsername = (state: RootState) => state.auth.user.fullName;
const getUserId = (state: RootState) => state.auth.user.id;

export {getUsername, getIsAuthenticated, getUserId};