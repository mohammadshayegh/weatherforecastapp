import { render, screen } from "@testing-library/react";
import Chip, { ChipPropsType } from ".";

const setup = (label: ChipPropsType["label"], type: ChipPropsType["type"]) => {
  render(<Chip label={label} type={type} />);
  const chip = screen.getByText(label);
  return { chip };
};

describe("Chip", () => {
  it("should render different chip types correctly", () => {
    const types: Array<ChipPropsType["type"]> = [
      "danger",
      "success",
      "info",
      "warning",
    ];
    types.forEach((type) => {
      const label = `This is a test for ${type} chip`;
      const { chip } = setup(label, type);
      expect(chip).toBeInTheDocument();
    });
  });
});
