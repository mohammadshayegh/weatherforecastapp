import { useDispatch, useSelector } from "react-redux";
import {
  NotificationType,
  addNotification,
  deleteNotification,
} from "../../store/slices/notification";
import { AppDispatch, StoreType } from "../../store";

export type AddNotificationInputType = Pick<
  NotificationType,
  "message" | "type"
>;

export const useNotification = () => {
  const { notifications } = useSelector(
    (state: StoreType) => state.notification
  );
  const dispatch: AppDispatch = useDispatch();

  const addAndDeleteNotification = (notification: AddNotificationInputType) => {
    const id = Math.floor(Math.random() * 1000000);
    dispatch(addNotification({ ...notification, id }));

    setTimeout(() => {
      dispatch(deleteNotification({ id }));
    }, 5000);
  };

  const deleteNotificationById = (id: NotificationType["id"]) =>
    dispatch(deleteNotification({ id }));

  return {
    notifications,
    addNotification: addAndDeleteNotification,
    deleteNotification: deleteNotificationById,
  };
};
