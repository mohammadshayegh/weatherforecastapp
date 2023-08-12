import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CityType, GeoLocationType } from "../../services/types/city";

type InitialStateType = {
  searchedCity: CityType | null | undefined;
  userLocation: GeoLocationType | null | undefined;
};

export const searchedCitySlice = createSlice({
  name: "searchedCity",
  initialState: {
    searchedCity: null,
    userLocation: null,
  } as InitialStateType,
  reducers: {
    setSelectedCity: (
      state,
      action: PayloadAction<InitialStateType["searchedCity"]>
    ) => {
      state.searchedCity = action.payload;
    },
    setUserLocation: (
      state,
      action: PayloadAction<InitialStateType["userLocation"]>
    ) => {
      state.userLocation = action.payload;
    },
  },
});

export const { setSelectedCity, setUserLocation } = searchedCitySlice.actions;
export default searchedCitySlice.reducer;
