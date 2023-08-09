import { WeatherCardProps } from ".";
import styles from "./styles.module.css";

type PropTypes = {
  details: WeatherCardProps["details"];
};

const WetherDetails = ({ details }: PropTypes) => {
  return (
    <>
      {details?.map((detail, index) => {
        return (
          <div className={styles["weather-details"]} key={index}>
            <span>{detail.label}</span>
            <span>{detail.value}</span>
          </div>
        );
      })}{" "}
    </>
  );
};

export default WetherDetails;
