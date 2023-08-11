import { WeatherCardProps } from ".";
import Skeleton from "../core/Skeleton";
import styles from "./styles.module.css";

export type TemperatureProps = {
  temperature: WeatherCardProps["temperature"];
  realFeel: WeatherCardProps["realFeel"];
  isLoading: WeatherCardProps["isLoading"];
};

const Temperature = ({
  temperature,
  realFeel,
  isLoading,
}: TemperatureProps) => {
  if (isLoading)
    return (
      <div className={styles["all-temperatures"]}>
        <div>
          <span className={styles["temperature"]}>
            <Skeleton width="120px" height="93px" />
          </span>
        </div>
        <span className={styles["real-feel"]}>
          <Skeleton width="100px" />
        </span>
      </div>
    );

  return (
    <div className={styles["all-temperatures"]}>
      <div>
        <span className={styles["temperature"]}>{temperature}°</span>
        <span className={styles["temperature-unit"]}>C</span>
      </div>
      {realFeel && (
        <span className={styles["real-feel"]}>Real Feel {realFeel}°c</span>
      )}
    </div>
  );
};

export default Temperature;
