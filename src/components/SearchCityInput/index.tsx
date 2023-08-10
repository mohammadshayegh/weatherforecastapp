import { useMemo, useState } from "react";
import { useGetCities } from "../../services/api/city";
import Autocomplete from "../Autocomplete";

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
  const { data: cities } = useGetCities(inputValue, { enabled: !!inputValue });

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

  if (loading) return <></>;

  return (
    <Autocomplete
      defaultValue={defaultValue}
      items={items || []}
      onChange={setInputValue}
      onOptionSelect={onOptionSelectHandler}
    />
  );
};

export default SearchCityInput;
