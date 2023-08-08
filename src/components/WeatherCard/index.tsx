import styles from "./styles.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";

type PropsType = {
  city: string;
  temperature: number;
  icon: string;
  condition: string;
  realFeel: number;
  time: string;
  humidity: number;
  temperatureF: number;
  realFeelF: number;
};

const WeatherCard = ({
  city,
  icon,
  temperature,
  condition,
  realFeel,
  time,
  humidity,
  temperatureF,
  realFeelF,
}: PropsType) => {
  return (
    <div className={styles["weather-card"]}>
      <div className={styles["title"]}>{city} current weather </div>
      <div className={styles["time"]}>{time}</div>
      <div className={styles["weather-info"]}>
        <div className={styles["all-temperatures"]}>
          <div>
            <span className={styles["temperature"]}>{temperature}°</span>
            <span className={styles["temperature-unit"]}>C</span>
          </div>
          <span className={styles["real-feel"]}>Real Feel {realFeel}°</span>
        </div>
        <div>
          <div className={styles["weather-details"]}>
            <span>Humidity</span>
            <span>{humidity}</span>
          </div>
          <div className={styles["weather-details"]}>
            <span>Temperature (°F)</span>
            <span>{temperatureF}</span>
          </div>
          <div className={styles["weather-details"]}>
            <span>Feels like (°F)</span>
            <span>{realFeelF}</span>
          </div>
        </div>
      </div>
      <div className={styles["more-details"]}>
        <div>{condition}</div>
        <a href="#" className={styles["more-details-link"]}>
          More details <AiOutlineArrowRight />
        </a>
      </div>
    </div>
  );
};

export default WeatherCard;
