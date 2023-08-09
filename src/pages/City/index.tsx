import { useState } from "react";
import WeatherCard from "../../components/WeatherCard";
import { useGetCityForecast } from "../../services/api/forecast";
import ForecastCards from "./ForecastCards";
import NavBar from "./Navbar";

const City = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const [coordination, setCoordination] = useState({
    lat: urlParams.get("lat") || 0,
    lon: urlParams.get("lon") || 0,
  });
  const { data, loading } = useGetCityForecast(
    +coordination.lat,
    +coordination.lon
  );

  const city = data?.current;
  const { name, country } = data?.location || {};

  return (
    <>
      <NavBar
        setCoordination={setCoordination}
        defaultValue={`${name} (${country})`}
        loading={loading}
      />
      <div>
        <WeatherCard
          temperature={city?.temp_c}
          title={`${name} (${country}) current weather`}
          condition={city?.condition?.text}
          realFeel={city?.feelslike_c}
          time={city?.last_updated}
          icon={city?.condition?.icon}
          details={[
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
        />
      </div>
    </>
  );
};

export default City;