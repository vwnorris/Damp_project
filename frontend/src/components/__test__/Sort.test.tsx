import { Sort } from "../sort";
import { store } from "../../store";
import {
  render,
  screen,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  store.dataStore.resetStore();
});

afterEach(cleanup);

describe("Test sort component", () => {
  it("render sort component", () => {
    render(<Sort />);
  });


  it("sort button should enable and disable", () => {
    render(<Sort />);
    expect(screen.getByTestId("sort-button")).toHaveAttribute("disabled");

    fireEvent.mouseDown(
      screen.getByRole("button", {
        name: /type none/i,
      })
    );

    fireEvent.click(screen.getByText(/name/i));

    expect(screen.getByTestId("sort-button")).not.toHaveAttribute("disabled");
    expect(store.dataStore.sort.type).toBe("NAME");
  });


  it("sort button apply sort", () => {
    render(<Sort />);
    expect(screen.getByTestId("sort-button")).toHaveAttribute("disabled");

    fireEvent.mouseDown(
      screen.getByRole("button", {
        name: /type none/i,
      })
    );

    fireEvent.click(screen.getByText(/name/i));
    userEvent.click(screen.getByTestId("sort-button"));

    expect(store.dataStore.sort.type).toBe("NAME");
    expect(store.dataStore.sort.ascending).toBe(true);
  });


  it("test ascending and descending", () => {
    const spy1 = jest.spyOn(store.dataStore, "setSort");
    render(<Sort />);

    fireEvent.mouseDown(
      screen.getByRole("button", {
        name: /type none/i,
      })
    );

    fireEvent.click(screen.getByText(/name/i));

    fireEvent.mouseDown(screen.getByTestId("sort-button"));

    fireEvent.mouseDown(
        screen.getByRole('button', {
            name: /ascending/i
          })
      );
  
      fireEvent.click(screen.getByText(/descending/i));
  
      fireEvent.mouseDown(screen.getByTestId("sort-button"));

      fireEvent.mouseDown(
        screen.getByRole('button', {
            name: /descending/i
          })
      );
  
      fireEvent.click(screen.getByText(/ascending/i));

      fireEvent.mouseDown(
        screen.getByRole('button', {
            name: /type name/i
          })
      );
  
      fireEvent.click(screen.getByText(/price/i));
  
      fireEvent.mouseDown(screen.getByTestId("sort-button"));

      expect(spy1).toHaveBeenCalled()
  });
});
