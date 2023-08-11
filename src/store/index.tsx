import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slices/notification";

export default configureStore({
  reducer: {
    notification: notificationReducer,
  },
});
