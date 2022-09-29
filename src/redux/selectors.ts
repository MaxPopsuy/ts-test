import { BookingData, Trip } from '../utils/interfaces/api';

interface User {
  id: null;
  fullName: null;
  email: null;
  createdAt: null;
}

interface Auth {
  user: User;
  token: string;
  isAuthenticated: boolean;
}

interface Trips {
  tripsArray: Trip[];
  filter: string;
  level: string;
  duration: string;
}

interface RootState {
  auth: Auth;
  trips: Trips;
  bookings: BookingData[];
  isLoading: boolean;
  error: string;
  modal: boolean;
}

// import {useAppSelector} from './store'
const getIsLoading = (state: RootState) => state.isLoading;
const getModal = (state: RootState) => state.modal;

export type { RootState };
export { getIsLoading, getModal };

// TS infers type: (state: RootState) => boolean
// const selectIsOn = (state: RootState) => state.isOn

// TS infers `isOn` is boolean
// const isOn = useSelector(selectIsOn)
