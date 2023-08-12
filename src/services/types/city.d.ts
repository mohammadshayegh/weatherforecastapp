import { ResponseType } from "./common";

export type GeoLocationType = {
  lat: number;
  lon: number;
};

type CityType = GeoLocationType & {
  country: string;
  id: number;
  name: string;
  region: string;
  url: string;
};

export type CityResponseType = ResponseType<CityType[]>;
