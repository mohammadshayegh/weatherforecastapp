import { useState } from "react";
import { useGetWeather } from "../services/api/weather";
import TextInput from "../components/TextInput";
import WeatherCard from "../components/WeatherCard";
import styles from "./styles.module.css";
import { useGetCities } from "../services/api/city";
import Autocomplete from "../components/Autocomplete";

const Layout = () => {
  const [city, setCity] = useState("");
  const data = useGetWeather("London");
  const cities: any = useGetCities(city);

  const {
    temp_c,
    temp_f,
    condition,
    feelslike_c,
    feelslike_f,
    last_updated,
    humidity,
  } = data?.data?.current || {};
  const { name } = data?.data?.location || {};

  return (
    <div className={styles["layout"]}>
      <div className={styles["wrapper"]}>
        <Autocomplete
          items={
            cities.data?.map(({ id, name, country }: any) => ({
              id,
              label: `${name} (${country})`,
            })) || []
          }
          onChange={setCity}
          onOptionSelect={(e) => {
            console.log(e);
          }}
        />
        <TextInput onChange={setCity} debounceTime={500} />

        <WeatherCard
          temperature={temp_c}
          city={name}
          icon={condition?.icon}
          condition={condition?.text}
          realFeel={feelslike_c}
          time={last_updated}
          humidity={humidity}
          temperatureF={temp_f}
          realFeelF={feelslike_f}
        />
      </div>
    </div>
  );
};

export default Layout;
