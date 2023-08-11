import { useRef, useState } from "react";
import TextInput from "../TextInput";
import styles from "./styles.module.css";
import AutocompleteOptions from "./AutocompleteOptions";
import useOutsideOfElementClicked from "../../../hooks/useOutsideOfElementClicked";
import { CiLocationOn, CiSearch } from "react-icons/ci";

export type OptionType = {
  id: number | null;
  label: string;
} | null;

export type AutocompletePropsType = {
  onChange?: (value: string) => void;
  debounceTime?: number;
  items: OptionType[];
  onOptionSelect?: (value: OptionType) => void;
  defaultValue?: string;
  adornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
};

const Autocomplete = ({
  onChange,
  debounceTime = 500,
  items,
  onOptionSelect,
  defaultValue,
  adornment,
  endAdornment,
}: AutocompletePropsType) => {
  const autocompleteWrapperRef = useRef(null);
  const key = useRef(0);
  const [value, setValue] = useState(defaultValue || "");
  const [open, setOpen] = useState(true);

  useOutsideOfElementClicked(autocompleteWrapperRef, () => setOpen(false));

  const onChangeHandler = (value: string) => {
    setValue(value);
    onChange?.(value);
  };

  const onOptionSelectHandler = (value: OptionType) => {
    key.current++;
    onOptionSelect?.(value);
    onChangeHandler(value?.label || "");

    setOpen(false);
  };

  return (
    <div className={styles["wrapper"]} ref={autocompleteWrapperRef}>
      <TextInput
        onChange={onChangeHandler}
        debounceTime={debounceTime}
        onFocus={() => setOpen(true)}
        className={styles["input"]}
        defaultValue={value}
        key={key.current}
        adornment={adornment}
        endAdornment={endAdornment}
      />
      <AutocompleteOptions
        items={items}
        open={value.length > 2 && open}
        onOptionSelect={onOptionSelectHandler}
      />
    </div>
  );
};

export default Autocomplete;
