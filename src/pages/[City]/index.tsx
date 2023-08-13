import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNotification } from "../../components/Notification/hooks";
import WeatherCard from "../../components/WeatherCard";
import { useGetCityForecast } from "../../services/api/forecast";
import { ErrorType } from "../../services/types/common";
import { StoreType } from "../../store";
import {
  setSearchedCityDetails,
  setSearchedCityInInput,
} from "../../store/slices/searchedCity";
import { extractErrorMessage } from "../../utils/errors";
import { createCityUrl } from "../../utils/city";
import ForecastCards from "./ForecastCards";
import NavBar from "./Navbar";
import styles from "./styles.module.css";
import { ForecastResponseType } from "../../services/types/forecast";

const City = () => {
  const { addNotification } = useNotification();
  const { city: cityUrl = "" } = useParams();
  const [searchedCityUrl, setSearchedCityUrl] = useState(cityUrl);
  const dispatch = useDispatch();
  const { searchedCityDetails: searchedCity } = useSelector(
    (state: StoreType) => state.searchedCity
  );

  const onError = (error: ErrorType) => {
    const message = extractErrorMessage(error);
    addNotification({ message, type: "danger" });
  };

  const onSuccess = (data: ForecastResponseType) => {
    const { name, country } = data?.location || {};
    dispatch(setSearchedCityDetails(data.location));
    dispatch(setSearchedCityInInput(`${name} (${country})`));
  };

  const { data, isLoading } = useGetCityForecast(
    { query: searchedCityUrl },
    { onError, onSuccess }
  );

  const { current: city } = data || {};
  const { name, country } = data?.location || {};

  useEffect(() => {
    const url = createCityUrl(searchedCity);
    setSearchedCityUrl(url);
    window.history.replaceState(null, "", url);
  }, [searchedCity]);

  return (
    <>
      <NavBar />
      <div className={styles["cards-wrapper"]}>
        <WeatherCard
          temperature={city?.temp_c}
          title={name ? `${name} (${country}) current weather` : "No data"}
          condition={city?.condition?.text}
          realFeel={city?.feelslike_c}
          time={city?.last_updated}
          icon={city?.condition?.icon}
          isLoading={isLoading}
          details={[
            { label: "Cloud", value: `${city?.cloud || 0}%` },
            { label: "Humidity", value: `${city?.humidity || 0}%` },
            { label: "temperature (°F)", value: city?.temp_f },
            { label: "Real Feel (°F)", value: city?.feelslike_f },
            { label: "UV", value: city?.uv },
            { label: "Pressure (in)", value: city?.pressure_in },
            { label: "Wind (kph)", value: city?.wind_kph },
            { label: "Wind (mph)", value: city?.wind_mph },
          ]}
        />
        <ForecastCards
          forecastInfo={data?.forecast?.forecastday}
          country={country}
          cityName={name}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default City;
