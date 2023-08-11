import clsx from "clsx";
import styles from "./styles.module.css";

type SkeletonPropTypes = {
  width?: string;
  height?: string;
  className?: string;
  type?: "circle" | "rect" | "text";
};

const Skeleton = ({
  width,
  height,
  className,
  type = "text",
}: SkeletonPropTypes) => {
  return (
    <div
      className={clsx(
        styles["skeleton"],
        styles[`skeleton--${type}`],
        className
      )}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
