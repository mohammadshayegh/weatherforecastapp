import { debounce } from "lodash";
import { useCallback, useState } from "react";
import styles from "./style.module.css";

type PropsType = {
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: string) => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  debounceTime?: number;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  adornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
};

const TextInput = ({
  defaultValue,
  placeholder,
  onChange = () => {},
  className,
  disabled,
  debounceTime = 1500,
  onFocus,
  onBlur,
  adornment,
  endAdornment,
}: PropsType) => {
  const [value, setValue] = useState(defaultValue);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    debouncedOnChange(value);
  };

  const debouncedOnChange = useCallback(debounce(onChange, debounceTime), [
    onChange,
  ]);

  return (
    <div className={[styles["wrapper"], className].join(" ")}>
      <div className={styles["icon"]}>{adornment}</div>
      <input
        type="text"
        className={styles["text-input"]}
        value={value}
        onChange={onChangeHandler}
        disabled={disabled}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <div className={styles["adornment"]}>{endAdornment}</div>
    </div>
  );
};

export default TextInput;
