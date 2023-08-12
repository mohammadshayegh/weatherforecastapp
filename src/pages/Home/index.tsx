import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { useNotification } from "../../components/Notification/hooks";
import SearchCityInput from "../../components/SearchCityInput";
import WeatherCard from "../../components/WeatherCard";
import { useGetWeather } from "../../services/api/weather";
import { ErrorType } from "../../services/types/common";
import { extractErrorMessage } from "../../utils/errors";
import styles from "./styles.module.css";
import { StoreType } from "../../store";

const Home = () => {
  const { searchedCity } = useSelector(
    (state: StoreType) => state.searchedCity
  );
  const { addNotification } = useNotification();

  const onError = (error: ErrorType) => {
    const message = extractErrorMessage(error);
    addNotification({ message, type: "danger" });
  };

  console.log(searchedCity);

  const { data, isLoading } = useGetWeather(
    searchedCity || { lat: 0, lon: 0 },
    {
      enabled: !isEmpty(searchedCity),
      onError,
    }
  );
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
            link={searchedCity?.url}
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
