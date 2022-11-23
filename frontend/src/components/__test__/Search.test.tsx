import { Search } from "../search";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { SEARCH_GAME } from "../../graphQL";
import "@testing-library/jest-dom";
import { GameCards } from "../gamecard";
import { Provider } from "mobx-react";
import { store } from "../../store";
import renderer, { act } from "react-test-renderer";

const mocks = [
  {
    request: {
      query: SEARCH_GAME,
      variables: {
        search: "trackmania",
      },
    },
    result: {
      data: {
        gameSearch: [
          {
            __typename: "Game",
            name: "Overcooked 1",
            appId: 379720,
          },
          {
            __typename: "Game",
            name: "Overcooked 2",
            appId: 578080,
          },
          {
            __typename: "Game",
            name: "Overcooked 3",
            appId: 637090,
          },
          {
            __typename: "Game",
            name: "Overcooked 4",
            appId: 221100,
          },
          {
            __typename: "Game",
            name: "Overcooked 5",
            appId: 8500,
          },
          {
            __typename: "Game",
            name: "Overcooked 5",
            appId: 601150,
          },
          {
            __typename: "Game",
            name: "Overcooked 6",
            appId: 477160,
          },
          {
            __typename: "Game",
            name: "Overcooked 7",
            appId: 644930,
          },
          {
            __typename: "Game",
            name: "Overcooked 8",
            appId: 774241,
          },
          {
            __typename: "Game",
            name: "Overcooked 9",
            appId: 527230,
          },
        ],
      },
      loading: false,
      variables: { search: "Overcooked" },
    },
  },
  {
    request: {
      query: SEARCH_GAME,
      variables: {
        search: "",
      },
    },
    result: {
      data: {
        gameSearch: [
          {
            __typename: "Game",
            name: "Overcooked 1",
            appId: 379720,
          },
          {
            __typename: "Game",
            name: "Overcooked 2",
            appId: 578080,
          },
          {
            __typename: "Game",
            name: "Overcooked 3",
            appId: 637090,
          },
          {
            __typename: "Game",
            name: "Overcooked 4",
            appId: 221100,
          },
          {
            __typename: "Game",
            name: "Overcooked 5",
            appId: 8500,
          },
          {
            __typename: "Game",
            name: "Overcooked 6",
            appId: 477160,
          },
          {
            __typename: "Game",
            name: "Overcooked 7",
            appId: 644930,
          },
          {
            __typename: "Game",
            name: "Overcooked 8",
            appId: 774241,
          },
          {
            __typename: "Game",
            name: "Overcooked 9",
            appId: 527230,
          },
        ],
      },
      loading: false,
      variables: { search: "Overcooked" },
    },
  },
];

afterEach(cleanup);

describe("Searchbar test", () => {
  it("renders with correct search", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Search />
      </MockedProvider>
    );

    screen.getByLabelText(/search/i);
    userEvent.type(screen.getByLabelText(/search/i), "t");

    expect(store.dataStore.searchString).toBe("t");
    expect(screen.getByDisplayValue("t")).toBeInTheDocument();

    userEvent.type(screen.getByLabelText(/search/i), "{backspace}");
    expect(store.dataStore.searchString).toBe("");
  });
  
  it("help icon works as intended", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Search />
      </MockedProvider>
    );

    screen.getByTestId("HelpOutlineIcon");
    userEvent.hover(screen.getByTestId("HelpOutlineIcon"));

    expect(
      screen.getByText("You can search by game name, developer, or publisher")
    ).toBeInTheDocument();

    userEvent.unhover(screen.getByTestId("HelpOutlineIcon"));
  });

  it("help icon removes text on click", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Search />
      </MockedProvider>
    );
    
    userEvent.click(screen.getByTestId("HelpOutlineIcon"));
    
  })

  it("reset search", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Search />
      </MockedProvider>
    );

    screen.getByLabelText(/search/i);
    userEvent.type(screen.getByLabelText(/search/i), "typing");

    act(() => {
      screen.getByTestId("reset-search").click();
    });

    expect(screen.queryByText("typing")).not.toBeInTheDocument();
    expect(store.dataStore.searchString).toBe("");
  })

  it("gives no games found with bad search", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider {...store}>
          <Search />
          <GameCards />
        </Provider>
      </MockedProvider>
    );
    screen.getByTestId("searchBox");
    const field = within(screen.getByTestId("searchBox")).getByLabelText(
      "search"
    );
    expect(field).toBeInTheDocument();
    fireEvent.change(field, { target: { value: "trackmania" } });
    expect(screen.getByDisplayValue("trackmania")).toBeInTheDocument();
  }); 
});


describe("Searchbar snapshot test", () => {
  it("render searcherbar", () => {
    const tree = renderer
      .create(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Search />
        </MockedProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  }); 
}); 
