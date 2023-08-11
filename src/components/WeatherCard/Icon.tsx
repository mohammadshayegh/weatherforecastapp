import { WeatherCardProps } from ".";
import Skeleton from "../core/Skeleton";
import styles from "./styles.module.css";

type IconPropTypes = {
  src: WeatherCardProps["icon"];
  condition: WeatherCardProps["condition"];
  isLoading: WeatherCardProps["isLoading"];
};

const Icon = ({ src, condition, isLoading }: IconPropTypes) => {
  if (isLoading)
    return (
      <div>
        <Skeleton type="circle" width="100px" height="100px" />
        <Skeleton type="text" />
      </div>
    );

  return (
    <div>
      {src && <img className={styles["icon"]} alt={condition} src={src} />}
      <div>{condition}</div>
    </div>
  );
};

export default Icon;
