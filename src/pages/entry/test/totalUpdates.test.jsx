import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops"></Options>);

  //make sure subtotal starts as 0.00
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  //update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});
test("update toppings subtotal when toppings change", async () => {
  render(<Options optionType="toppings"></Options>);

  //make sure subtotal starts as 0.00
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // update cherries checked
  const cherryInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherryInput);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // update hot fudge checked
  const hotFudgeInput = await screen.findByRole("checkbox", {
    name: "Hot Fudge",
  });
  userEvent.click(hotFudgeInput);
  expect(toppingsSubtotal).toHaveTextContent("3.00");
  // update uncheck cherries
  userEvent.click(cherryInput);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  // test("grand total starts at $0.00", () => {
  //   render(<OrderEntry></OrderEntry>);
  //   const grandTotal = screen.getByRole("heading", { name: /grand total \$/i });
  //   expect(grandTotal).toHaveTextContent("0.00");
  // });
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry></OrderEntry>);
    const grandTotal = screen.getByRole("heading", { name: /grand total \$/i });
    expect(grandTotal).toHaveTextContent("0.00");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry></OrderEntry>);
    const grandTotal = screen.getByRole("heading", { name: /grand total \$/i });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry></OrderEntry>);
    const grandTotal = screen.getByRole("heading", { name: /grand total \$/i });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("3.50");
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
