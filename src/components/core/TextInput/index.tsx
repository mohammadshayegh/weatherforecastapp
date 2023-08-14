import {
  CSSProperties,
  FocusEvent,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./style.module.css";
import isNil from "lodash/isNil";
import debounce from "lodash/debounce";
import { clss } from "../../../utils/styles";
import config from "../../../config";

export type TextInputPropsType = {
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
  value?: string;
};

const TextInput = ({
  defaultValue,
  placeholder,
  onChange = () => {},
  className,
  disabled,
  debounceTime = config.DEBOUNCE_TIME_MS,
  onFocus,
  adornment,
  endAdornment,
  onKeyDown,
  value,
}: TextInputPropsType) => {
  const [inputValue, setInputValue] = useState<string>(
    value || defaultValue || ""
  );

  const handleInputChange = useCallback(
    (newValue: string) => {
      setInputValue(newValue);
      onChange(newValue);
    },
    [onChange]
  );

  const debouncedInputChange = useCallback(
    debounce(handleInputChange, debounceTime),
    [debounceTime, handleInputChange]
  );

  useEffect(() => {
    if (!isNil(value)) setInputValue(value);
  }, [value]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    debouncedInputChange(value);
  };

  return (
    <div className={clss(styles["wrapper"], className)}>
      {adornment && <div className={styles["adornment"]}>{adornment}</div>}
      <input
        type="text"
        className={styles["text-input"]}
        onChange={onChangeHandler}
        value={inputValue || ""}
        disabled={disabled}
        placeholder={placeholder}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      />
      {endAdornment && (
        <div className={styles["end-adornment"]}>{endAdornment}</div>
      )}
    </div>
  );
};

export default TextInput;
