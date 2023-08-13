import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CityType } from "../../services/types/city";

type InitialStateType = {
  searchedCityInInput: string | null | undefined;
  searchedCityDetails: CityType | null | undefined;
};

export const searchedCitySlice = createSlice({
  name: "searchedCity",
  initialState: {
    searchedCityDetails: null,
    searchedCityInInput: null,
  } as InitialStateType,
  reducers: {
    setSearchedCityDetails: (
      state,
      action: PayloadAction<InitialStateType["searchedCityDetails"]>
    ) => {
      state.searchedCityDetails = action.payload;
    },
    setSearchedCityInInput: (
      state,
      action: PayloadAction<InitialStateType["searchedCityInInput"]>
    ) => {
      state.searchedCityInInput = action.payload;
    },
  },
});

export const { setSearchedCityDetails, setSearchedCityInInput } =
  searchedCitySlice.actions;
export default searchedCitySlice.reducer;
