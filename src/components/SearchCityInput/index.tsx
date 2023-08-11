import { useMemo, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useGetCities } from "../../services/api/city";
import { setSelectedCity } from "../../store/slices/searchCity";
import { extractErrorMessage } from "../../utils/errors";
import { useNotification } from "../Notification/hooks";
import Autocomplete from "../core/Autocomplete";
import { AxiosError } from "axios";

const SearchCityInput = () => {
  const [inputValue, setInputValue] = useState("");
  const { addNotification } = useNotification();
  const { searchedCity } = useSelector((state: any) => state.searchCity);
  const enabledGetCities = useRef(false);
  const dispatch = useDispatch();

  const onError = (error: AxiosError) => {
    const message = extractErrorMessage(error);
    addNotification({ message, type: "danger" });
  };

  const onSuccess = (data: any) => {
    if (data.length === 0) {
      addNotification({ message: "No cities found", type: "warning" });
    }
  };

  const { data: cities } = useGetCities(inputValue.trim(), {
    enabled: enabledGetCities.current,
    onError,
    onSuccess,
  });

  const onCitySelect = (value: any) => {
    if (!value) return;

    enabledGetCities.current = false;

    const selectedCity = cities?.find(
      (city) => city.lat === value.lat && city.lon === value.lon
    );

    document.title = `${selectedCity?.name} (${selectedCity?.country})`;

    dispatch(setSelectedCity(selectedCity));
  };

  const cityName = searchedCity?.name
    ? `${searchedCity?.name} (${searchedCity?.country})`
    : undefined;

  const items = useMemo(() => {
    return cities?.map((city) => ({
      ...city,
      label: `${city.name} (${city.country})`,
    }));
  }, [cities]);

  return (
    <Autocomplete
      defaultValue={cityName}
      items={items || []}
      onChange={setInputValue}
      onOptionSelect={onCitySelect}
      adornment={<CiSearch fontSize="2rem" />}
      placeholder="Search city"
      onKeyDown={() => {
        enabledGetCities.current = true;
      }}
    />
  );
};

export default SearchCityInput;
