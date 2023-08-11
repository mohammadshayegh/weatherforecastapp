import WeatherCard from "../../components/WeatherCard";
import { CityType } from "../../services/types/city";
import { ForecastDayType } from "../../services/types/forecast";

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
  console.log(forecastInfo);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Forecast (5 Days)</h2>
      {forecastInfo?.map((day) => {
        return (
          <WeatherCard
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
