import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNotification } from "../../components/Notification/hooks";
import WeatherCard from "../../components/WeatherCard";
import { useGetCityForecast } from "../../services/api/forecast";
import { ErrorType } from "../../services/types/common";
import { StoreType } from "../../store";
import { extractErrorMessage } from "../../utils/errors";
import ForecastCards from "./ForecastCards";
import NavBar from "./Navbar";
import styles from "./styles.module.css";
import {
  setSelectedCity,
  setUserSearchedCity,
} from "../../store/slices/searchedCity";

const City = () => {
  const { addNotification } = useNotification();
  const dispatch = useDispatch();
  const { searchedCity } = useSelector(
    (state: StoreType) => state.searchedCity
  );

  const { city: cityUrl } = useParams();

  const onError = (error: ErrorType) => {
    const message = extractErrorMessage(error);
    addNotification({ message, type: "danger" });
  };

  const { data, isLoading } = useGetCityForecast(
    { query: searchedCity?.url || cityUrl || "" },
    {
      onError,
      onSuccess: (data) => {
        const { name, country } = data?.location || {};

        dispatch(setSelectedCity({ ...data.location, url: cityUrl || "" }));
        dispatch(setUserSearchedCity(`${name} (${country})`));
      },
    }
  );

  const city = data?.current;
  const { name, country } = data?.location || {};

  useEffect(() => {
    const { pathname } = window.location;
    window.history.replaceState(null, "", searchedCity?.url || pathname);
  }, [searchedCity]);

  return (
    <>
      <NavBar />
      <div className={styles["cards-wrapper"]}>
        <WeatherCard
          temperature={city?.temp_c}
          title={`${name} (${country}) current weather`}
          condition={city?.condition?.text}
          realFeel={city?.feelslike_c}
          time={city?.last_updated}
          icon={city?.condition?.icon}
          isLoading={isLoading}
          details={[
            { label: "Cloud", value: `${city?.cloud}%` },
            { label: "Humidity", value: `${city?.humidity}%` },
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
