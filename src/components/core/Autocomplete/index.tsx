import { useEffect, useRef, useState } from "react";
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
  value?: string;
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
  value,
  placeholder,
  adornment,
  endAdornment,
  onKeyDown,
}: AutocompletePropsType<T>) {
  const autocompleteWrapperRef = useRef(null);
  const [inputValue, setInputValue] = useState(value || "");
  const [open, setOpen] = useState(true);

  useOutsideOfElementClicked(autocompleteWrapperRef, () => setOpen(false));

  const onChangeHandler = (value: string) => {
    setInputValue(value);
    onChange?.(value);
  };

  const onOptionSelectHandler = (value: T) => {
    onOptionSelect?.(value);
    onChangeHandler(value?.label || "");

    setOpen(false);
  };

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  return (
    <div className={styles["wrapper"]} ref={autocompleteWrapperRef}>
      <TextInput
        onChange={onChangeHandler}
        debounceTime={debounceTime}
        onFocus={() => setOpen(true)}
        className={styles["input"]}
        value={inputValue}
        adornment={adornment}
        endAdornment={endAdornment}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
      <AutocompleteOptions
        items={items}
        open={inputValue.length > 2 && open}
        onOptionSelect={onOptionSelectHandler}
      />
    </div>
  );
}

export default Autocomplete;
