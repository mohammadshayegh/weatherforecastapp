export function clss(...args: any[]) {
  const classNames = args.filter(
    (className) => typeof className === "string" && className.length > 0
  );

  return classNames.join(" ");
}
