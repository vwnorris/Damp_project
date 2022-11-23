import { ResetButton } from "../resetbutton";
import { store } from "../../store"
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import { SortType } from "../../types";

beforeEach(() => {
    store.resetStores()
})

afterEach(cleanup)

describe("test header component", () => {
  it("renders with correct header", () => {
    store.dataStore.setSort(SortType.NAME);
    render(<ResetButton />);

    act(() => {
      screen.getByTestId("reset-button").click();
    });
  });
});

describe("header snapshot tests", () => {
  it("basic snapshot test", () => {
    const tree = renderer.create(<ResetButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
