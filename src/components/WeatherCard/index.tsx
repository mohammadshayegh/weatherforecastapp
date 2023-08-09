import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import WetherDetails from "./WeatherDeatils";

export type WeatherCardProps = {
  title?: string;
  temperature?: number;
  icon?: string;
  condition?: string;
  realFeel?: number;
  time?: string;
  humidity?: number;
  temperatureF?: number;
  realFeelF?: number;
  link?: string;
  details?: { label: string; value?: string | number }[];
};

const WeatherCard = ({
  title,
  icon,
  temperature,
  condition,
  realFeel,
  time,
  link,
  details,
}: WeatherCardProps) => {
  const detailsMain = details?.slice(0, 3);
  const detailsSecondary = details?.slice(3, details.length);

  return (
    <div className={styles["weather-card"]}>
      <div className={styles["title"]}>{title} </div>
      <div className={styles["time"]}>{time}</div>
      <div className={styles["weather-info"]}>
        <div className={styles["weather-info__left"]}>
          <div className={styles["all-temperatures"]}>
            <div>
              <span className={styles["temperature"]}>{temperature}°</span>
              <span className={styles["temperature-unit"]}>C</span>
            </div>
            {realFeel && (
              <span className={styles["real-feel"]}>
                Real Feel {realFeel}°c
              </span>
            )}
          </div>
          <div>
            {icon && (
              <img className={styles["icon"]} alt={condition} src={icon} />
            )}
            <div>{condition}</div>
          </div>
        </div>
        <div>
          <WetherDetails details={detailsMain} />
        </div>
      </div>
      <div className={styles["weather-info-more-details"]}>
        <WetherDetails details={detailsSecondary} />
      </div>

      {link && (
        <Link to={link} className={styles["more-details-link"]}>
          More details <AiOutlineArrowRight />
        </Link>
      )}
    </div>
  );
};

export default WeatherCard;
