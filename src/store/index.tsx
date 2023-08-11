import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slices/notification";
import queriesReducer from "./slices/queries";
import searchCityReducer from "./slices/searchCity";

export default configureStore({
  reducer: {
    notification: notificationReducer,
    queries: queriesReducer,
    searchCity: searchCityReducer,
  },
});
