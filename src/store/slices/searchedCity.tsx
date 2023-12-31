import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CityType } from "../../services/types/city";
import { createCityName } from "../../utils/city";

type InitialStateType = {
  searchedCityInInput: string;
  searchedCityDetails: CityType | null | undefined;
};

export const searchedCitySlice = createSlice({
  name: "searchedCity",
  initialState: {
    searchedCityDetails: null,
    searchedCityInInput: "",
  } as InitialStateType,
  reducers: {
    setSearchedCityDetails: (
      state,
      action: PayloadAction<InitialStateType["searchedCityDetails"]>
    ) => {
      //FIXME: this is a side effect, move it to the component
      document.title = createCityName(action.payload);
      state.searchedCityDetails = action.payload;
    },
    setSearchedCityInInput: (
      state,
      action: PayloadAction<InitialStateType["searchedCityInInput"]>
    ) => {
      state.searchedCityInInput = action.payload?.trim();
    },
  },
});

export const { setSearchedCityDetails, setSearchedCityInInput } =
  searchedCitySlice.actions;
export default searchedCitySlice.reducer;
