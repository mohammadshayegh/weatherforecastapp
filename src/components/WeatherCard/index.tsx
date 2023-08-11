import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import Skeleton from "../core/Skeleton";
import Icon from "./Icon";
import Temperature from "./Temperature";
import WetherDetails from "./WeatherDeatils";
import styles from "./styles.module.css";

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
  isLoading?: boolean;
  type?: "compact";
};

const WeatherCard = ({
  title = "--",
  icon,
  temperature,
  condition,
  realFeel,
  time,
  link,
  details,
  type,
  isLoading,
}: WeatherCardProps) => {
  const detailsMain = details?.slice(0, 4);
  const detailsSecondary = details?.slice(4, details.length);

  return (
    <div className={styles["weather-card"]}>
      {/* City name & Time */}
      <div className={styles["title"]}>
        {isLoading ? <Skeleton width="220px" /> : title}
      </div>
      <div className={styles["time"]}>
        {isLoading ? <Skeleton width="120px" /> : time}
      </div>

      {/* Weather status */}
      <div className={styles["weather-info"]}>
        <div className={styles["weather-info__left"]}>
          <Temperature
            temperature={temperature}
            realFeel={realFeel}
            isLoading={isLoading}
          />
          <Icon src={icon} condition={condition} isLoading={isLoading} />
        </div>
        <div>
          <WetherDetails details={detailsMain} isLoading={isLoading} />
        </div>
      </div>

      {/* More weather status details */}
      {type !== "compact" && (
        <div className={styles["weather-info-more-details"]}>
          <WetherDetails details={detailsSecondary} isLoading={isLoading} />
        </div>
      )}

      {/* More deatils link */}
      {isLoading ? (
        <Skeleton />
      ) : (
        link && (
          <Link to={link} className={styles["more-details-link"]}>
            More details <AiOutlineArrowRight />
          </Link>
        )
      )}
    </div>
  );
};

export default WeatherCard;
