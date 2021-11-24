import { render, screen } from "@testing-library/react";
import { waitForElementToBeRemoved } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
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

    userEvent.click(checkbox);

    expect(button).toBeEnabled();
    expect(checkbox).toBeChecked();

    userEvent.click(checkbox);
    expect(button).toBeDisabled();
    expect(checkbox).not.toBeChecked();
  });
  test("popup responds to hover", async () => {
    render(<SummaryForm></SummaryForm>);
    //popup starts hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    const termsAndConditions = screen.getByText(/Terms and conditions/i);
    userEvent.hover(termsAndConditions);

    //popup appears on mouseover
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    //popup disappears on mouseout
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
