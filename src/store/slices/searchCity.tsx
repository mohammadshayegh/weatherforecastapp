import { createSlice } from "@reduxjs/toolkit";

export const searchCitySlice = createSlice({
  name: "searchCity",
  initialState: {
    searchedCity: {},
    userLocation: null,
  },
  reducers: {
    setSelectedCity: (state, action) => {
      const { payload } = action;
      state.searchedCity = payload;
    },
    setUserLocation: (state, action) => {
      const { payload } = action;
      state.userLocation = payload;
    },
  },
});

export const { setSelectedCity, setUserLocation } = searchCitySlice.actions;
export default searchCitySlice.reducer;
