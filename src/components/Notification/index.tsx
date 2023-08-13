import { RxCross1 } from "react-icons/rx";
import { NotificationType } from "../../store/slices/notification";
import Chip from "../core/Chip";
import { useNotification } from "./hooks";
import styles from "./styles.module.css";
import { clss } from "../../utils/styles";
import config from "../../config";

const EndAdornment = ({ id }: Pick<NotificationType, "id">) => {
  const { deleteNotification } = useNotification();

  return (
    <RxCross1
      onClick={() => deleteNotification(id)}
      className={styles["cross-icon"]}
    />
  );
};

const Notification = () => {
  const { notifications } = useNotification();

  return (
    <div
      className={clss(
        styles["wrapper"],
        !notifications.length && styles["wrapper--hidden"]
      )}
    >
      <div className={styles["notifications"]}>
        {notifications.map((notification) => (
          <Chip
            key={notification.id}
            label={notification.message}
            type={notification.type}
            timer={config.NOTIFICATION_APPEARANCE_TIME_MS}
            endAdornment={<EndAdornment id={notification.id} />}
            data-testid={`notification-${notification.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Notification;
