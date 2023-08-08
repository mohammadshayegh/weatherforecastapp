import { isEqual } from "lodash";
import { useEffect, useRef } from "react";

const useDeepCompareEffect = (callback: () => void, dependencies: any[]) => {
  const previousDependencies = useRef<any[]>([]);

  if (!isEqual(previousDependencies.current, dependencies)) {
    previousDependencies.current = dependencies;
  }

  useEffect(callback, previousDependencies.current);
};

export default useDeepCompareEffect;
