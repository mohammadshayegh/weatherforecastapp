import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import Home from ".";

const initialState = {
  notification: {
    notifications: [],
  },
  searchedCity: {
    searchedCityDetails: {},
    searchedCityInInput: "",
  },
  queries: {
    queries: [],
  },
};

const reducer = (state = initialState, payload: any) => {
  if (payload.type === "searchedCity/searchedCityInInput") {
    return {
      ...state,
      searchedCity: {
        ...state.searchedCity,
        searchedCityInInput: payload.inputValue,
      },
    };
  }

  return state;
};

const mockStore = configureStore({ reducer });

jest.mock("axios", () => ({
  create: jest.fn(() => {}),
}));

const setup = () => {
  return render(
    <Provider store={mockStore}>
      <Home />
    </Provider>
  );
};

describe("Home page", () => {
  it("should read the input value from redux", () => {
    setup();
    const input = screen.getByPlaceholderText("Search city");
    expect(input).toHaveValue("");
    const inputNewValue = "London";
    act(() => {
      mockStore.dispatch({
        type: "searchedCity/searchedCityInInput",
        inputValue: inputNewValue,
      });
    });
    expect(input).toHaveValue(inputNewValue);
    jest.clearAllMocks();
  });
});
