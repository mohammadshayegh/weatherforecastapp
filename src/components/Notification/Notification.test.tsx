import { render, screen } from "@testing-library/react";
import Notification from ".";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import { NotificationType } from "../../store/slices/notification";

const initialState = {
  notification: {
    notifications: [
      { id: 1, message: "test 1", type: "success" },
    ] as NotificationType[],
  },
};

const reducer = (state = initialState, payload: any) => {
  switch (payload.type) {
    case "notification/addNotification": {
      const notifications = [
        ...state.notification.notifications,
        payload.payload,
      ];
      return { ...state, notification: { notifications } };
    }
    case "notification/deleteNotifications":
      return { ...state, notification: { notifications: [] } };

    default:
      return state;
  }
};

const mockStore = configureStore({ reducer });

const setup = () => {
  return render(
    <Provider store={mockStore}>
      <Notification />
    </Provider>
  );
};

describe("Notification", () => {
  it("should render notification", async () => {
    setup();

    const store = mockStore.getState();
    store.notification.notifications.forEach((notification) => {
      expect(screen.getByText(notification.message)).toBeInTheDocument();
    });
  });

  it("should add notification", async () => {
    setup();

    act(() => {
      mockStore.dispatch({
        type: "notification/addNotification",
        payload: { id: 2, message: "test 2", type: "danger" },
      });
    });

    const store = mockStore.getState();

    store.notification.notifications.forEach((notification) => {
      expect(screen.getByText(notification.message)).toBeInTheDocument();
    });
  });

  it("should remove notification", async () => {
    setup();
    act(() => {
      mockStore.dispatch({ type: "notification/deleteNotifications" });
    });

    const store = mockStore.getState();
    expect(store.notification.notifications.length).toBe(0);
    const notifications = screen.queryAllByTestId(/notification-/);
    expect(notifications.length).toBe(0);
  });
});
