import { RefObject, useEffect } from "react";

function useOutsideOfElementClicked(
  ref: RefObject<HTMLInputElement>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside({ target }: MouseEvent) {
      if (ref.current && !ref.current.contains(target as Node | null)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideOfElementClicked;
