import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slices/notification";
import queriesReducer from "./slices/queries";
import searchCityReducer from "./slices/searchedCity";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    queries: queriesReducer,
    searchedCity: searchCityReducer,
  },
});

export default store;
export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
