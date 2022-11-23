import { Header } from "../header";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";

function TestComponent() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const val = localStorage.getItem("dark-mode");
    if (val === "true") {
      setDarkMode(true);
    }
  }, [darkMode]);

  return (
    <>
      <p>Is it on? {JSON.stringify(darkMode)}</p>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    </>
  );
}
describe("test header component", () => {
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  it("renders with correct header", () => {
    render(<Header darkMode={false} setDarkMode={() => {}} />);
    screen.getByText(/damp/i);
    screen.getByText(/light/i);
    screen.getByText(/about/i);
  });

  it("test reload of page", () => {
    render(<Header darkMode={false} setDarkMode={() => {}} />);

    act(() => {
      screen.getByText(/damp/i).click()
    })

    screen.getByText(/damp/i)
  });

  it("about loads correctly", async () => {
    render(<Header darkMode={false} setDarkMode={() => {}} />);
    act(() => {
      screen.getByText(/about/i).click();
    })
    act(() => {
      screen.getByText(/light/i).click();
    });
    const cont = await waitFor(() => screen.findByText(/how to use damp/i));

    fireEvent.keyDown(cont, {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    });

    const modal = screen.queryByText(/how to use damp/i);
    expect(modal).not.toBeInTheDocument();
  });

  it("handles darkmode toggle", async () => {
    localStorage.setItem("dark-mode", "false");
    render(<TestComponent />);
    screen.getByText(/false/i);
    act(() => {
      screen.getByText(/light/i).click();
    });
    await waitFor(() => screen.findByText(/true/i));
    act(() => {
      screen.getByText(/dark/i).click();
    });
    await waitFor(() => screen.findByText(/false/i));
  });
});

describe("header snapshot tests", () => {
  it("basic snapshot test", () => {
    const tree = renderer
      .create(<Header darkMode={false} setDarkMode={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
