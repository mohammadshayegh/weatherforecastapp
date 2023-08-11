import { useState } from "react";
import { useNotification } from "../../components/Notification/hooks";
import SearchCityInput from "../../components/SearchCityInput";
import WeatherCard from "../../components/WeatherCard";
import { useGetWeather } from "../../services/api/weather";
import { extractErrorMessage } from "../../utils/errors";
import styles from "./styles.module.css";

const Home = () => {
  const [city, setCity] = useState({ lat: 51.52, lon: -0.11 });
  const { addNotification } = useNotification();

  const { data, isLoading } = useGetWeather(
    { lat: city.lat, lon: city.lon },
    {
      onError: (error) => {
        const message = extractErrorMessage(error);

        addNotification({ message, type: "danger" });
      },
    }
  );

  const {
    temp_c,
    temp_f,
    condition,
    feelslike_c,
    feelslike_f,
    last_updated,
    humidity,
    cloud,
  } = data?.current || {};
  const { name, country, lat, lon } = data?.location || {};

  return (
    <div className={styles["layout"]}>
      <div className={styles["wrapper"]}>
        <SearchCityInput onCitySelect={setCity} />
        <WeatherCard
          temperature={temp_c}
          title={`${name} (${country}) current weather`}
          condition={condition?.text}
          realFeel={feelslike_c}
          time={last_updated}
          link={`/city?lat=${lat}&lon=${lon}`}
          isLoading={isLoading}
          type="compact"
          details={[
            { label: "Humidity", value: `${humidity}%` },
            { label: "Cloud", value: `${cloud}%` },
            { label: "temperature (°F)", value: temp_f },
            { label: "Real Feel (°F)", value: feelslike_f },
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
