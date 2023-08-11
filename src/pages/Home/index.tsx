import { AxiosError } from "axios";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { useNotification } from "../../components/Notification/hooks";
import SearchCityInput from "../../components/SearchCityInput";
import WeatherCard from "../../components/WeatherCard";
import { useGetWeather } from "../../services/api/weather";
import { extractErrorMessage } from "../../utils/errors";
import styles from "./styles.module.css";

const Home = () => {
  const { searchedCity } = useSelector((state: any) => state.searchCity);
  const { addNotification } = useNotification();

  const onError = (error: AxiosError) => {
    const message = extractErrorMessage(error);
    addNotification({ message, type: "danger" });
  };

  const { data, isLoading } = useGetWeather(searchedCity, {
    enabled: !isEmpty(searchedCity),
    onError,
  });
  const { current: weather, location } = data || {};

  return (
    <div className={styles["layout"]}>
      <div className={styles["wrapper"]}>
        <SearchCityInput />
        {weather && (
          <WeatherCard
            temperature={weather?.temp_c}
            title={`${location?.name} (${location?.country}) current weather`}
            condition={weather?.condition?.text}
            realFeel={weather?.feelslike_c}
            time={weather?.last_updated}
            link={searchedCity.url}
            isLoading={isLoading}
            type="compact"
            details={[
              { label: "Humidity", value: `${weather?.humidity}%` },
              { label: "Cloud", value: `${weather?.cloud}%` },
              { label: "temperature (°F)", value: weather?.temp_f },
              { label: "Real Feel (°F)", value: weather?.feelslike_f },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
