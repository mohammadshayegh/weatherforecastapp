import { useMemo, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useSearchCityByText } from "../../services/api/city";
import { CityResponseType, CityType } from "../../services/types/city";
import { ErrorType } from "../../services/types/common";
import { AppDispatch, StoreType } from "../../store";
import {
  setSearchedCityDetails,
  setSearchedCityInInput,
} from "../../store/slices/searchedCity";
import { extractErrorMessage } from "../../utils/errors";
import { useNotification } from "../Notification/hooks";
import Autocomplete from "../core/Autocomplete";

const SearchCityInput = () => {
  const inputValue =
    useSelector((state: StoreType) => state.searchedCity.searchedCityInInput) ||
    "";

  const { addNotification } = useNotification();
  const { searchedCityDetails: searchedCity } = useSelector(
    (state: StoreType) => state.searchedCity
  );
  const enabledGetCities = useRef(false);
  const dispatch: AppDispatch = useDispatch();

  const setInputValue = (value: string) => {
    dispatch(setSearchedCityInInput(value));
  };

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
    enabled: enabledGetCities.current && inputValue?.trim().length > 2,
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

    dispatch(setSearchedCityDetails(selectedCity));
  };

  const cityName = searchedCity?.name
    ? `${searchedCity?.name} (${searchedCity?.country})`
    : undefined;

  const items = cities?.map((city) => ({
    ...city,
    label: `${city.name} (${city.country})`,
  }));

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
