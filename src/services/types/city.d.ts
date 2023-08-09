import { ResponseType } from "./generics";

export interface CityType {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
}

export type CityResponseType = ResponseType<CityType[]>;
