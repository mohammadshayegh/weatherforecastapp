import { useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useSearchCityByText } from "../../services/api/search";
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
import { createCityName } from "../../utils/city";

const SearchCityInput = () => {
  const { addNotification } = useNotification();
  const { searchedCityDetails: searchedCity } = useSelector(
    (state: StoreType) => state.searchedCity
  );
  const enabledGetCities = useRef(false);
  const dispatch: AppDispatch = useDispatch();

  const inputValue = useSelector(
    (state: StoreType) => state.searchedCity.searchedCityInInput
  );
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

  const { data: cities } = useSearchCityByText(inputValue, {
    enabled: enabledGetCities.current && inputValue.length > 2,
    onError,
    onSuccess,
  });

  const onCitySelect = (value: CityType) => {
    if (!value) return;

    const selectedCity = cities?.find(
      ({ lat, lon }) => lat === value.lat && lon === value.lon
    );

    enabledGetCities.current = false;
    dispatch(setSearchedCityDetails(selectedCity));
  };

  const items = cities?.map((city) => ({
    ...city,
    label: createCityName(city),
  }));

  return (
    <Autocomplete
      value={createCityName(searchedCity) || inputValue}
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
