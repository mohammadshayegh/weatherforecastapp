import { useRef, useState } from "react";
import useOutsideOfElementClicked from "../../../hooks/useOutsideOfElementClicked";
import TextInput from "../TextInput";
import AutocompleteOptions from "./AutocompleteOptions";
import styles from "./styles.module.css";

export type OptionType = {
  id: number | null;
  label: string;
};

export type AutocompletePropsType<T> = {
  onChange?: (value: string) => void;
  debounceTime?: number;
  items: T[];
  onOptionSelect?: (value: T) => void;
  defaultValue?: string;
  placeholder?: string;
  adornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

function Autocomplete<T extends OptionType>({
  onChange,
  debounceTime = 500,
  items,
  onOptionSelect,
  defaultValue,
  placeholder,
  adornment,
  endAdornment,
  onKeyDown,
}: AutocompletePropsType<T>) {
  const autocompleteWrapperRef = useRef(null);
  const key = useRef(0);
  const [value, setValue] = useState(defaultValue || "");
  const [open, setOpen] = useState(true);

  useOutsideOfElementClicked(autocompleteWrapperRef, () => setOpen(false));

  const onChangeHandler = (value: string) => {
    setValue(value);
    onChange?.(value);
  };

  const onOptionSelectHandler = (value: T) => {
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
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
      <AutocompleteOptions
        items={items}
        open={value.length > 2 && open}
        onOptionSelect={onOptionSelectHandler}
      />
    </div>
  );
}

export default Autocomplete;
