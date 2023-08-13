import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { useNotification } from "../../components/Notification/hooks";
import SearchCityInput from "../../components/SearchCityInput";
import WeatherCard from "../../components/WeatherCard";
import { useGetCurrentWeather } from "../../services/api/current";
import { ErrorType } from "../../services/types/common";
import { StoreType } from "../../store";
import { createCityUrl } from "../../utils/city";
import { extractErrorMessage } from "../../utils/errors";
import styles from "./styles.module.css";

const Home = () => {
  const { searchedCityDetails: searchedCity } = useSelector(
    (state: StoreType) => state.searchedCity
  );
  const { addNotification } = useNotification();

  const onError = (error: ErrorType) => {
    const message = extractErrorMessage(error);
    addNotification({ message, type: "danger" });
  };

  const { data, isLoading } = useGetCurrentWeather(
    createCityUrl(searchedCity),
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
            link={createCityUrl(data?.location)}
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
