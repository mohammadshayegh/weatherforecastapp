import { useMemo, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useSearchCityByText } from "../../services/api/city";
import { CityResponseType, CityType } from "../../services/types/city";
import { ErrorType } from "../../services/types/common";
import { AppDispatch, StoreType } from "../../store";
import {
  setSelectedCity,
  setUserSearchedCity,
} from "../../store/slices/searchedCity";
import { extractErrorMessage } from "../../utils/errors";
import { useNotification } from "../Notification/hooks";
import Autocomplete from "../core/Autocomplete";

const SearchCityInput = () => {
  const inputValue =
    useSelector((state: StoreType) => state.searchedCity.userSearchedCity) ||
    "";

  const { addNotification } = useNotification();
  const { searchedCity } = useSelector(
    (state: StoreType) => state.searchedCity
  );
  const enabledGetCities = useRef(false);
  const dispatch: AppDispatch = useDispatch();

  const setInputValue = (value: string) => {
    dispatch(setUserSearchedCity(value));
  };

  console.log("inputValue", inputValue);

  const onError = (error: ErrorType) => {
    const message = extractErrorMessage(error);
    addNotification({ message, type: "danger" });
  };

  const onSuccess = (data: CityResponseType) => {
    if (data?.length === 0) {
      addNotification({ message: "No cities found", type: "warning" });
    }
  };

  const { data: cities } = useSearchCityByText(inputValue?.trim() || "", {
    enabled: enabledGetCities.current,
    onError,
    onSuccess,
  });

  const onCitySelect = (value: CityType) => {
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
      defaultValue={cityName || inputValue}
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
