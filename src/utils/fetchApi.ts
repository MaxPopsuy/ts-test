import {
  Credentials,
  CredentialsLogin,
  BookingData,
  Trip,
} from "./interfaces/api";
import axios from "axios";
axios.defaults.baseURL = "https://travel-app-api.glitch.me/api/v1";

const register = (credentials: Credentials) => {
  return axios
    .post("/auth/sign-up", credentials)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const login = (credentials: CredentialsLogin) => {
  return axios
    .post("/auth/sign-in", credentials)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const getCurrent = () => {
  return axios
    .get("/auth/authenticated-user")
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const getTrips = () => {
  return axios
    .get<Trip[]>("/trips")
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const getTripById = (tripId: string | undefined): Promise<Trip> => {
  return axios
    .get(`/trips/${tripId}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};
const getBookings = () => {
  return axios
    .get("/bookings")
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const createBooking = (requestData: BookingData) => {
  console.log(requestData);
  return axios
    .post("/bookings", requestData)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const deleteBooking = (bookingId: string): Promise<Object> => {
  return axios
    .delete(`/bookings/${bookingId}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export {
  register,
  login,
  getCurrent,
  getTrips,
  getTripById,
  getBookings,
  createBooking,
  deleteBooking,
};
