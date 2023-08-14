import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import isNil from "lodash/isNil";

//FIXME: move this to a separate file

export type NotificationType = {
  id: string | number;
  message: string;
  type: "success" | "danger" | "warning" | "info";
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [] as NotificationType[],
  },
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationType>) => {
      const { payload } = action;

      state.notifications.push({
        id: payload.id,
        message: payload.message,
        type: payload.type,
      });
    },
    deleteNotification: (
      state,
      action: PayloadAction<{ id: NotificationType["id"] }>
    ) => {
      const { payload } = action;

      state.notifications = state.notifications.filter((notification) => {
        if (!isNil(payload.id)) return notification.id !== payload.id;

        return true;
      });
    },
  },
});

export const { addNotification, deleteNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
