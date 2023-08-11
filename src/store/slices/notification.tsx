import { createSlice } from "@reduxjs/toolkit";
import { isNil } from "lodash";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
  },
  reducers: {
    addNotification: (state, action) => {
      const { payload } = action;

      //@ts-ignore
      state.notifications.push({
        id: payload.id,
        message: payload.message,
        type: payload.type,
      });
    },
    deleteNotification: (state, action) => {
      const { payload } = action;
      //@ts-ignore
      state.notifications = state.notifications.filter(
        (notification, index) => {
          if (!isNil(payload.index)) return index !== payload.index;
          //@ts-ignore
          if (!isNil(payload.id)) return notification.id !== payload.id;

          return true;
        }
      );
    },
  },
});

export const { addNotification, deleteNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
