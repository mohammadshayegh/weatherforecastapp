import { useState } from "react";
import { getUserGeoLocation } from "../utils/navigator";
import { GeoLocationType } from "../services/types/city";

export const useGeoLocation = () => {
  const [geoLocation, setGeoLocation] = useState<GeoLocationType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  getUserGeoLocation()
    .then(setGeoLocation)
    .catch(setError)
    .finally(() => setLoading(false));

  return { geoLocation, loading, error };
};
