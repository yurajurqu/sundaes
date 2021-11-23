import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../summaryForm";

describe("when everything is ok", () => {
  test("it should display initially the checkbox unchecked and the button disabled", async () => {
    render(<SummaryForm></SummaryForm>);
    const checkbox = await screen.findByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = await screen.findByRole("button", {
      name: /confirm order/i,
    });
    expect(button).toBeDisabled();
    expect(checkbox).not.toBeChecked();
  });
  test("it should display enable the button if unchecked checkbox is checked", async () => {
    render(<SummaryForm></SummaryForm>);
    const checkbox = await screen.findByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = await screen.findByRole("button", {
      name: /confirm order/i,
    });
    expect(button).toBeDisabled();
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(button).toBeEnabled();
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
    expect(checkbox).not.toBeChecked();
  });
});
