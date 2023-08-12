import { isNil } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { useNotification } from "../../components/Notification/hooks";
import WeatherCard from "../../components/WeatherCard";
import { useGetCityForecast } from "../../services/api/forecast";
import { ErrorType } from "../../services/types/common";
import { StoreType } from "../../store";
import {
  setSelectedCity,
  setUserSearchedCity,
} from "../../store/slices/searchedCity";
import { extractErrorMessage } from "../../utils/errors";
import { createUrl } from "../../utils/url";
import ForecastCards from "./ForecastCards";
import NavBar from "./Navbar";
import styles from "./styles.module.css";

const City = () => {
  const { addNotification } = useNotification();
  const [searchParams] = useSearchParams();
  const [lat, lon] = [searchParams.get("lat"), searchParams.get("lon")];
  const [geoLocation, setGeoLocation] = useState<{
    lat: number | string | null | undefined;
    lon: number | string | null | undefined;
  }>({ lat, lon });
  const dispatch = useDispatch();
  const { searchedCity } = useSelector(
    (state: StoreType) => state.searchedCity
  );

  const { city: cityName = "" } = useParams();

  const onError = (error: ErrorType) => {
    const message = extractErrorMessage(error);
    addNotification({ message, type: "danger" });
  };

  const { data, isLoading } = useGetCityForecast(
    {
      query:
        isNil(geoLocation.lat) || isNil(geoLocation.lon)
          ? cityName
          : `${geoLocation.lat},${geoLocation.lon}`,
    },
    {
      onError,
      onSuccess: (data) => {
        const { name, country } = data?.location || {};

        dispatch(setSelectedCity({ ...data.location, url: cityName }));
        dispatch(setUserSearchedCity(`${name} (${country})`));
      },
    }
  );

  const city = data?.current;
  const { name, country } = data?.location || {};

  useEffect(() => {
    setGeoLocation({ lat: searchedCity?.lat, lon: searchedCity?.lon });
    window.history.replaceState(null, "", createUrl(searchedCity));
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
