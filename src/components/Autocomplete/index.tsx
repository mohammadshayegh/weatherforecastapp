import { useRef, useState } from "react";
import TextInput from "../TextInput";
import styles from "./styles.module.css";
import AutocompleteOptions from "./AutocompleteOptions";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

export type OptionType = {
  id: number | null;
  label: string;
} | null;

export type AutocompletePropsType = {
  onChange?: (value: string) => void;
  debounceTime?: number;
  items: OptionType[];
  onOptionSelect?: (value: OptionType) => void;
};

const Autocomplete = ({
  onChange,
  debounceTime = 500,
  items,
  onOptionSelect,
}: AutocompletePropsType) => {
  const autocompleteWrapperRef = useRef(null);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(true);

  useOutsideAlerter(autocompleteWrapperRef, () => setOpen(false));

  const onChangeHandler = (value: string) => {
    setValue(value);
    onChange?.(value);
  };

  const onOptionSelectHandler = (value: OptionType) => {
    onOptionSelect?.(value);
    onChangeHandler(value?.label || "");
    setOpen(false);
  };

  return (
    <div className={styles["wrapper"]} ref={autocompleteWrapperRef}>
      <TextInput
        onChange={onChangeHandler}
        debounceTime={debounceTime}
        // inputValue={value}
        onFocus={() => setOpen(true)}
        className={styles["input"]}
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
