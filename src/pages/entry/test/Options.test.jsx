import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("display image for each scoop option from server", async () => {
  render(<Options optionType="scoops"></Options>);

  //find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
