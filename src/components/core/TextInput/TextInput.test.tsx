import { render, screen, waitFor } from "@testing-library/react";
import TextInput, { TextInputPropsType } from ".";
import userEvent from "@testing-library/user-event";

const setup = (props: TextInputPropsType) => {
  const placeholderValue = props.placeholder || "Text input";
  render(<TextInput {...props} placeholder={placeholderValue} />);
  const textInput = screen.getByPlaceholderText(placeholderValue);
  return { textInput };
};

describe("TextInput", () => {
  it("Should apply default value correctly", () => {
    const defaultValue = "Default value";
    const { textInput } = setup({ defaultValue: defaultValue });
    expect(textInput).toHaveValue(defaultValue);
  });

  it("Should apply placeholder correctly", () => {
    const placeholder = "Placeholder";
    const { textInput } = setup({ placeholder: placeholder });
    expect(textInput).toHaveAttribute("placeholder", placeholder);
  });

  it("Should call onChange handler after debouncing", async () => {
    const mockHook = jest.fn();
    const mockText = "Hello world";
    const { textInput } = setup({ onChange: mockHook, debounceTime: 350 });
    userEvent.type(textInput, mockText);
    expect(mockHook).not.toHaveBeenCalledWith(mockText);
    await waitFor(() => expect(mockHook).toHaveBeenCalledWith(mockText));
    jest.clearAllMocks();
  });

  it('Should disable input when "disabled" prop is true', () => {
    const { textInput } = setup({ disabled: true });
    expect(textInput).toBeDisabled();
  });

  it("Should call onFocus handler when input is focused", async () => {
    const mockHook = jest.fn();
    const { textInput } = setup({ onFocus: mockHook });
    userEvent.click(textInput);
    await waitFor(() => expect(mockHook).toHaveBeenCalled());
    jest.clearAllMocks();
  });

  it("Should call onKeyDown handler when key is pressed", async () => {
    const mockHook = jest.fn();
    const { textInput } = setup({ onKeyDown: mockHook });
    userEvent.type(textInput, "{enter}");
    await waitFor(() => expect(mockHook).toHaveBeenCalled());
    jest.clearAllMocks();
  });

  it("Should render adornment and endAdornment correctly", () => {
    const adornmentText = "Adornment";
    const endAdornmentText = "EndAdornment";

    const Adornment = () => <div>{adornmentText}</div>;
    const EndAdornment = () => <div>{endAdornmentText}</div>;

    setup({ adornment: <Adornment />, endAdornment: <EndAdornment /> });
    expect(screen.getByText(adornmentText)).toBeInTheDocument();
    expect(screen.getByText(endAdornmentText)).toBeInTheDocument();
  });
});
