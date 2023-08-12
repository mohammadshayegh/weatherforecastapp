import { isEmpty, kebabCase } from "lodash";
import { CityType } from "../services/types/city";

export const createUrl = (location: CityType | null | undefined) => {
  if (!location || isEmpty(location)) return "";

  return `${kebabCase(location?.name)}?lat=${location?.lat}&lon=${
    location?.lon
  }`;
};
