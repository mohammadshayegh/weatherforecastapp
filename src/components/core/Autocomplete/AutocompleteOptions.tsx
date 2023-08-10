import { AutocompletePropsType, OptionType } from ".";
import styles from "./styles.module.css";

type PropsType = Pick<AutocompletePropsType, "items" | "onOptionSelect"> & {
  open: boolean;
};

const AutocompleteOptions = ({ items, open, onOptionSelect }: PropsType) => {
  if (!items.length || !open) return null;

  return (
    <div style={{ position: "relative" }}>
      <div className={styles["options-wrapper"]}>
        {items.map((item: OptionType) => (
          <div
            className={styles["option"]}
            onClick={() => onOptionSelect?.(item)}
          >
            {item?.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutocompleteOptions;
