import { useDispatch, useSelector } from "react-redux";
import {
  addNotification,
  deleteNotification,
} from "../../store/slices/notification";

export const useNotification = () => {
  const { notifications } = useSelector((state: any) => state.notification);
  const dispatch = useDispatch();

  const addAndDeleteNotification = (notification: any) => {
    const id = Math.floor(Math.random() * 1000000);
    dispatch(addNotification({ ...notification, id }));

    setTimeout(() => {
      dispatch(deleteNotification({ id }));
    }, 5000);
  };

  return {
    notifications,
    addNotification: addAndDeleteNotification,
    deleteNotification: (id: { id?: number; index?: number }) =>
      dispatch(deleteNotification(id)),
  };
};
