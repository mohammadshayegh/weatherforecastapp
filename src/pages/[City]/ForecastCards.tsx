import WeatherCard from "../../components/WeatherCard";
import config from "../../config";
import { CityType } from "../../services/types/city";
import { ForecastDayType } from "../../services/types/forecast";
import styles from "./styles.module.css";

type ForecastCardsProps = {
  forecastInfo?: ForecastDayType[] | undefined;
  country?: CityType["country"];
  cityName?: CityType["name"];
  isLoading?: boolean;
};

const ForecastCards = ({
  forecastInfo,
  country,
  cityName,
  isLoading,
}: ForecastCardsProps) => {
  const { FORECAST_DAYS_DEFAULT } = config;

  if (isLoading)
    return (
      <>
        <h2 className={styles["title"]}>
          Forecast ({FORECAST_DAYS_DEFAULT} Days)
        </h2>
        {Array(FORECAST_DAYS_DEFAULT)
          .fill(0)
          .map((_, index) => (
            <WeatherCard isLoading={true} key={index} />
          ))}
      </>
    );

  if (!forecastInfo?.length) return null;

  return (
    <>
      <h2 className={styles["title"]}>
        Forecast ({config.FORECAST_DAYS_DEFAULT} Days)
      </h2>
      {forecastInfo?.map((day) => {
        return (
          <WeatherCard
            key={`${day.date}_${day.day.maxtemp_c}`}
            temperature={day.day.maxtemp_c}
            title={`${cityName} (${country})`}
            time={day.date}
            condition={day.day.condition.text}
            icon={day.day.condition.icon}
            isLoading={isLoading}
            details={[
              {
                label: "Minimum temperature",
                value: `${day.day.mintemp_c}°C`,
              },
              { label: "Humidity", value: `${day.day.avghumidity}%` },
              { label: "Pressure (in)", value: day.day.totalprecip_in },
              { label: "Wind (kph)", value: day.day.maxwind_kph },
            ]}
          />
        );
      })}
    </>
  );
};

export default ForecastCards;
