import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { Game } from "../../types";
import { ModalStore } from "../modalStore";
import { RootStore } from "../rootStore";

describe("test modal store", () => {
    let rootStore: RootStore;
    let mockApollo: ApolloClient<NormalizedCacheObject>;
    let mockWatchQuery: any;
    const mockGame: Game = {
        name: "Overcooked",
        appId: 379720,
        imagePath: "https://cdn.akamai.steamstatic.com/steam/apps/379720/header.jpg",
        release_date: "May 12, 1962",
        publisher: ["Gutta boys"],
        genre: ["Action"],
        all_reviews: "",
        developer: "Johan",
        game_description: "Lets get cooking, awesome game",
        description: "",
        achievements: 59,
        languages: ["Hindu, Norwegian"],
        price: 42,
        releaseDate: new Date(),
        comments: []
    }

    beforeAll(async () => {
        mockApollo = new ApolloClient({
            cache: new InMemoryCache()
        });

        mockWatchQuery = jest.spyOn(mockApollo, "watchQuery");
        mockWatchQuery.mockReturnValue({
            refetch: async (variables: any) => (Promise.resolve({data: {games: [], game: mockGame}}))
        });
        rootStore = new RootStore(mockApollo);
    });
    
    beforeEach(async () => {
        mockWatchQuery.mockReturnValue({
            refetch: async (variables: any) => (Promise.resolve({data: {games: [], game: mockGame}}))
        });
        rootStore.modalStore = new ModalStore(rootStore, mockApollo);
    });

    it("should select and unselect a game", async () => {
        expect(rootStore.modalStore.game).toBeUndefined();
        rootStore.modalStore.selectGame(mockGame.appId);
        await new Promise(process.nextTick);
        expect(rootStore.modalStore.game).not.toBeUndefined();
        expect(rootStore.modalStore.game?.appId).toBe(mockGame.appId);
        expect(rootStore.modalStore.showModal).toBeTruthy();
        expect(rootStore.modalStore.selectedGame).toBe(mockGame.appId);
        
        rootStore.modalStore.unSelectGame();
        expect(rootStore.modalStore.showModal).toBeFalsy();
        expect(rootStore.modalStore.game).toBeUndefined();
        expect(rootStore.modalStore.selectedGame).toBe(-1);
    });

    it("should update gameData", async () => {
        expect(rootStore.modalStore.updating).toBeFalsy();
        rootStore.modalStore.selectedGame = -1;
        // should return
        rootStore.modalStore.updateGameData();
        
        rootStore.modalStore.selectGame(mockGame.appId);
        await new Promise(process.nextTick);
        expect(rootStore.modalStore.game?.name).toBe(mockGame.name);
        mockGame.name = "new Name";
        mockWatchQuery.mockReturnValue({
            refetch: async (variables: any) => (Promise.resolve({data: {games: [], game: mockGame}}))
        });
        rootStore.modalStore.updateGameData();
        expect(rootStore.modalStore.updating).toBeTruthy();
        await new Promise(process.nextTick);
        expect(rootStore.modalStore.game?.name).toBe(mockGame.name);
        expect(rootStore.modalStore.updating).toBeFalsy();
    });

    it("should reset store", async () => {
        rootStore.modalStore.selectGame(mockGame.appId);
        await new Promise(process.nextTick);
        expect(rootStore.modalStore.selectedGame).not.toBe(-1);
        
        rootStore.modalStore.resetStore();
        expect(rootStore.modalStore.selectedGame).toBe(-1);
    });
    
    it("should be resetable", async () => {
        rootStore.modalStore.selectGame(mockGame.appId);
        await new Promise(process.nextTick);
        expect(rootStore.modalStore.resetable).toBeTruthy();    
    });
})