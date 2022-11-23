import { render, screen, cleanup, getByAltText, within, fireEvent, queryByAttribute } from "@testing-library/react";
import { GameCards } from "../gamecard";
import { defaultContext, store } from "../../store";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "mobx-react";
import { Game, Comment } from "../../types";
import renderer, { act } from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { games } from "./testData/Games"
import { BackToTopButton } from "../gamecard/BackToTopButton";
import { CommentView } from "../gamecard/Comment";
import { GameCardModal } from "../gamecard/GameCardModal";
import { RootStore } from "../../store/rootStore";
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { ModalStore } from "../../store/modalStore";

const comment: Comment = {
  name: "the watcher",
  rating: 3,
  comment: "i recommend this game",
};

window.scrollTo = jest.fn();

afterEach(cleanup);

let rootStore: RootStore;
let mockApollo: ApolloClient<NormalizedCacheObject>;
let mockWatchQuery: any;

beforeEach( async () => {
  store.resetStores()
  store.dataStore.data.push(...games);
})

//const getById = queryByAttribute.bind(null, "id");


describe("GameCards test", () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing, and shows correct games", async () => {
    render(
      <Provider {...defaultContext}>
        <MockedProvider addTypename={false}>
          <GameCards />
        </MockedProvider>
      </Provider>
    );

    screen.getByText(/overcooked/i);
    screen.getByText(/May 12, 1962/i);
    screen.getByText(/Action/i);
    screen.getByText(/84%/i);

    screen.getByText(/elden ring/i);
    screen.getByText(/trackmania/i);
    screen.getByText(/movistar/i);
    
    screen.queryByTestId("back-to-top-button");

    fireEvent.click(screen.getByText(/overcooked/i));
  });

  it("comment view test", () => {
    render(<CommentView name={comment.name} rating={comment.rating} comment={comment.comment} />);
    screen.getByText(/the watcher/i);
    screen.getByText(/i recommend this game/i);
  });  

  it("back to top button", async () => {
    render(<BackToTopButton />);
    
    const button = screen.getByTestId("back-to-top");
    expect(button).toBeInTheDocument();
    
    fireEvent.scroll(window, { target: { scrollY: 200 } });
    expect(screen.queryByTestId("ArrowIcon")).toBeNull();;

    fireEvent.scroll(window, { target: { scrollY: 1500 } });
    expect(screen.getByTestId("ArrowIcon")).toBeInTheDocument();;

    fireEvent.click(screen.getByTestId("ArrowIcon"));

    expect(window.screenY).toBe(0);
    expect(screen.queryByTestId("ArrowIcon")).toBeNull();;
  });  
});




describe("game card modal", () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach( async () => {
    mockWatchQuery.mockReturnValue({
      refetch: async (variables: any) => (Promise.resolve({data: {games: [], game: games[0]}}))
    });

    store.modalStore = new ModalStore(rootStore, mockApollo);
    store.modalStore.selectGame(games[0].appId)
  })
  
  beforeAll(async () => {
    mockApollo = new ApolloClient({
        cache: new InMemoryCache()
    });
  
    mockWatchQuery = jest.spyOn(mockApollo, "watchQuery");
    mockWatchQuery.mockReturnValue({
        refetch: async (variables: any) => (Promise.resolve({data: {games: [], game: games[0]}}))
    });
    rootStore = new RootStore(mockApollo);
  });


  it("game card modal test", async () => {
    render(
      <Provider {...defaultContext}>
        <MockedProvider addTypename={false}> 
          <GameCardModal open={true} onClose={() => {}} />
        </MockedProvider>
      </Provider>
    );

    screen.getByText(/overcooked/i);
    screen.getByText(/42/i);
    screen.getByText(/59/i);
  });  

  it("add comment", async () => {
    render(
      <Provider {...defaultContext}>
        <MockedProvider addTypename={false}> 
          <GameCardModal open={true} onClose={() => {}} />
        </MockedProvider>
      </Provider>
    );

    const r = screen.getByTestId("rating");
    const nodes = Array.from(r.childNodes).filter(node => {
      return (node as HTMLElement).tagName === "INPUT";
    });
  
    act(() => {
      screen.getByTestId("make_comment").click();
    });

    userEvent.type(screen.getByLabelText(/name/i), "t");
    userEvent.type(screen.getByLabelText(/comment/i), "t");
    userEvent.type(screen.getByLabelText(/name/i), "{backspace}");
    userEvent.type(screen.getByLabelText(/comment/i), "{backspace}");
    userEvent.click(screen.getByTestId("add_comment"));
  
    userEvent.type(screen.getByLabelText(/name/i), "typing");
    userEvent.type(screen.getByLabelText(/comment/i), "typing");
    userEvent.click(nodes[2] as HTMLElement);

    userEvent.click(screen.getByTestId("add_comment"));
  });  
});


describe("game card modal test with some info abouth game", () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach( async () => {
    mockWatchQuery.mockReturnValue({
      refetch: async (variables: any) => (Promise.resolve({data: {games: [], game: games[15]}}))
    });

    store.modalStore = new ModalStore(rootStore, mockApollo);
    store.modalStore.selectGame(games[15].appId)
  })
  
  beforeAll(async () => {
    mockApollo = new ApolloClient({
        cache: new InMemoryCache()
    });
  
    mockWatchQuery = jest.spyOn(mockApollo, "watchQuery");
    mockWatchQuery.mockReturnValue({
        refetch: async (variables: any) => (Promise.resolve({data: {games: [], game: games[15]}}))
    });
    rootStore = new RootStore(mockApollo);
  });


  it("game card modal test", async () => {
    render(
      <Provider {...defaultContext}>
        <MockedProvider addTypename={false}> 
          <GameCardModal open={true} onClose={() => {}} />
        </MockedProvider>
      </Provider>
    );

    screen.getByText(/movistar/i);
  });  
});


describe("Filter snapshot test", () => {
  it("render filter component", () => {
    const tree = renderer
      .create(
        <Provider {...defaultContext}>
          <MockedProvider addTypename={false}>
            <GameCards />
          </MockedProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
}); 
