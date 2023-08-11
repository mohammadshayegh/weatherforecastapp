import clsx from "clsx";
import { RxCross1 } from "react-icons/rx";
import Chip from "../core/Chip";
import { useNotification } from "./hooks";
import styles from "./styles.module.css";

const EndAdornment = ({ id }: { id: number }) => {
  const { deleteNotification } = useNotification();
  return (
    <RxCross1
      onClick={() => deleteNotification({ id })}
      className={styles["cross-icon"]}
    />
  );
};

const Notification = () => {
  const { notifications } = useNotification();

  return (
    <div
      className={clsx(
        styles["wrapper"],
        !notifications.length && styles["wrapper--hidden"]
      )}
    >
      <div className={styles["notifications"]}>
        {notifications.map((notification: any) => (
          <Chip
            key={notification.id}
            label={notification.message}
            type={notification.type}
            timer={5}
            endAdornment={<EndAdornment id={notification.id} />}
          />
        ))}
      </div>
    </div>
  );
};

export default Notification;
