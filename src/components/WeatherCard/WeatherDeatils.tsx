import { WeatherCardProps } from ".";
import Skeleton from "../core/Skeleton";
import styles from "./styles.module.css";

type PropTypes = {
  details: WeatherCardProps["details"];
  isLoading?: WeatherCardProps["isLoading"];
};

const WetherDetails = ({ details, isLoading }: PropTypes) => {
  if (isLoading)
    return (
      <>
        {Array(4)
          .fill(0)
          .map((_, index) => {
            return (
              <div className={styles["weather-details"]} key={index}>
                <span>
                  <Skeleton width="100px" />
                </span>
                <span>
                  <Skeleton width="100px" />
                </span>
              </div>
            );
          })}
      </>
    );

  return (
    <>
      {details?.map((detail, index) => {
        return (
          <div className={styles["weather-details"]} key={index}>
            <span>{detail.label || "--"}</span>
            <span>{detail.value || "--"}</span>
          </div>
        );
      })}
    </>
  );
};

export default WetherDetails;
