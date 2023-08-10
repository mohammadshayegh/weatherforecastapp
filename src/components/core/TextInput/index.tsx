import { useCallback, useEffect, useState } from "react";
import styles from "./style.module.css";
import { debounce } from "lodash";
import { CiSearch, CiLocationOn } from "react-icons/ci";

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
      <div className={styles["icon"]}>
        <CiSearch fontSize="2rem" />
      </div>
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
      <div className={styles["adornment"]}>
        <CiLocationOn fontSize="2rem" />
      </div>
    </div>
  );
};

export default TextInput;
