import { AutocompletePropsType, OptionType } from ".";
import styles from "./styles.module.css";

type PropsType<T> = Pick<
  AutocompletePropsType<T>,
  "items" | "onOptionSelect"
> & {
  open: boolean;
};

function AutocompleteOptions<T extends OptionType>({
  items,
  open,
  onOptionSelect,
}: PropsType<T>) {
  if (!items.length || !open) return null;

  return (
    <div className={styles["options-container"]}>
      <div className={styles["options-wrapper"]}>
        {items.map((item: T) => (
          <div
            key={item.id}
            className={styles["option"]}
            onClick={() => onOptionSelect?.(item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AutocompleteOptions;
