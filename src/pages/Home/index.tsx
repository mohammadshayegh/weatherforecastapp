import { useState } from "react";
import SearchCityInput from "../../components/SearchCityInput";
import WeatherCard from "../../components/WeatherCard";
import { useGetWeather } from "../../services/api/weather";
import styles from "./styles.module.css";

const Home = () => {
  const [city, setCity] = useState({ lat: 51.52, lon: -0.11 });

  const data = useGetWeather(city.lat, city.lon);

  const {
    temp_c,
    temp_f,
    condition,
    feelslike_c,
    feelslike_f,
    last_updated,
    humidity,
  } = data?.data?.current || {};
  const { name, country, lat, lon } = data?.data?.location || {};

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
          details={[
            { label: "Humidity", value: `${humidity}%` },
            { label: "temperature (°F)", value: temp_f },
            { label: "Real Feel (°F)", value: feelslike_f },
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
