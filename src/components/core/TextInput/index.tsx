import { debounce } from "lodash";
import {
  CSSProperties,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useState,
} from "react";
import styles from "./style.module.css";

type PropsType = {
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: string) => void;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  debounceTime?: number;
  onFocus?: (e: FocusEvent<HTMLInputElement, Element>) => void;
  adornment?: ReactNode;
  endAdornment?: ReactNode;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

const TextInput = ({
  defaultValue,
  placeholder,
  onChange = () => {},
  className,
  disabled,
  debounceTime = 1500,
  onFocus,
  adornment,
  endAdornment,
  onKeyDown,
}: PropsType) => {
  const [value, setValue] = useState(defaultValue);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
        onKeyDown={onKeyDown}
      />
      <div className={styles["adornment"]}>{endAdornment}</div>
    </div>
  );
};

export default TextInput;
