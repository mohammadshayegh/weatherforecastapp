import { useMemo, useState } from "react";
import { useGetCities } from "../../services/api/city";
import { extractErrorMessage } from "../../utils/errors";
import { useNotification } from "../Notification/hooks";
import Autocomplete from "../core/Autocomplete";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { getUserGeoLocation } from "../../utils/navigator";

type SearchCityInputProps = {
  onCitySelect: (cord: { lat: number; lon: number }) => void;
  defaultValue?: string;
  loading?: boolean;
};

const SearchCityInput = ({
  onCitySelect,
  defaultValue,
  loading,
}: SearchCityInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const { addNotification } = useNotification();
  const { data: cities } = useGetCities(inputValue.trim(), {
    enabled: !!inputValue,
    onError: (error) => {
      const message = extractErrorMessage(error);
      addNotification({ message, type: "danger" });
    },
    onSuccess: (data) => {
      // @ts-ignore
      if (data.length === 0) {
        addNotification({ message: "No cities found", type: "warning" });
      }
    },
  });

  const items = useMemo(() => {
    return cities?.map((city) => ({
      ...city,
      label: `${city.name} (${city.country})`,
    }));
  }, [cities]);

  const onOptionSelectHandler = (value: any) => {
    if (!value) return;
    onCitySelect({ lat: value.lat, lon: value.lon });
  };

  const setCityBasedOnGeoLocation = () => {
    getUserGeoLocation()
      .then((cord: any) => {
        onCitySelect(cord);
      })
      .catch((error) => {
        addNotification({ message: error, type: "danger" });
      });
  };

  if (loading) return <></>;

  return (
    <Autocomplete
      defaultValue={defaultValue}
      items={items || []}
      onChange={setInputValue}
      onOptionSelect={onOptionSelectHandler}
      adornment={<CiSearch fontSize="2rem" />}
      endAdornment={
        <CiLocationOn fontSize="2rem" onClick={setCityBasedOnGeoLocation} />
      }
    />
  );
};

export default SearchCityInput;
