import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import ProfileReducer from "./features/profileSlice";
import TourReducer from "./features/tourSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
    profile: ProfileReducer,
  },
});
