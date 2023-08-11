import styles from "./styles.module.css";
import { BiErrorCircle, BiBadgeCheck, BiBulb, BiBell } from "react-icons/bi";
import { ChipPropsType } from ".";

type ChipIconPropsType = {
  type: ChipPropsType["type"];
};

const Icon = ({ type }: ChipIconPropsType) => {
  return (
    <span className={styles["icon"]}>
      {(() => {
        switch (type) {
          case "danger":
            return <BiErrorCircle />;
          case "success":
            return <BiBadgeCheck />;
          case "info":
            return <BiBulb />;
          case "warning":
            return <BiBell />;
        }
      })()}
    </span>
  );
};

export default Icon;
