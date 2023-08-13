import styles from "./styles.module.css";
import ChipIcon from "./ChipIcon";
import { clss } from "../../../utils/styles";

export type ChipPropsType = {
  label: string;
  type: "danger" | "success" | "info" | "warning";
  endAdornment?: React.ReactNode;
  timer?: number;
  "data-testid"?: string;
};

const Chip = ({
  label,
  type,
  endAdornment,
  timer,
  ...props
}: ChipPropsType) => {
  return (
    <div
      className={clss(styles["chip"], styles[`chip--${type}`])}
      data-testid={props["data-testid"]}
    >
      <ChipIcon type={type} />
      <span className={styles["label"]}>{label}</span>
      <div className={styles["end-adornment"]}>{endAdornment}</div>
      {timer ? (
        <div
          className={styles["timer"]}
          style={{ animationDuration: `${timer}ms` }}
        />
      ) : null}
    </div>
  );
};

export default Chip;
