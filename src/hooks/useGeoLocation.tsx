import { useState } from "react";
import { getUserGeoLocation } from "../utils/navigator";

export const useGeoLocation = () => {
  const [geoLocation, setGeoLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  getUserGeoLocation()
    .then(setGeoLocation as any)
    .catch(setError)
    .finally(() => setLoading(false));

  return { geoLocation, loading, error };
};
