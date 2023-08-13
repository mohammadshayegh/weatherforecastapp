import { isEmpty, kebabCase } from "lodash";
import { CityType } from "../services/types/city";

export const createCityUrl = (location: CityType | null | undefined) => {
  if (!location || isEmpty(location)) return "";

  return `${
    kebabCase(location?.name) +
    "-" +
    kebabCase(location.region) +
    "-" +
    kebabCase(location.country)
  }`;
};

export const createCityName = (location: CityType | null | undefined) => {
  if (!location || isEmpty(location) || !location.name) return "";

  return `${location.name} (${location.country})`;
};
