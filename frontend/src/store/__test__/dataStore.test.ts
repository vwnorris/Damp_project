import { ApolloClient, ApolloError, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { Game, SortType } from "../../types";
import { DataStore } from "../dataStore";
import { RootStore } from "../rootStore";

describe("test dataStore", () => {
    let rootStore: RootStore;
    let mockApollo: ApolloClient<NormalizedCacheObject>;
    let mockRefetch: any;
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
            refetch: async (variables: any) => (Promise.resolve({data: {games: []}}))
        });
        rootStore = new RootStore(mockApollo);
    });
    
    beforeEach(async () => {
        mockWatchQuery.mockReturnValue({
            refetch: async (variables: any) => (Promise.resolve({data: {games: []}}))
        });
        rootStore.dataStore = new DataStore(rootStore, mockApollo);
    });
    
    it("should call to get games on init", async () => {
        expect(rootStore.dataStore.data.length).toBe(0);
        mockRefetch = jest.spyOn(rootStore.dataStore.query, "refetch");
        mockRefetch.mockReturnValue(Promise.resolve({data: {games: [mockGame]}}))
        await rootStore.dataStore.getMoreData();
        expect(rootStore.dataStore.data.length).toBe(1);
    });

    it("should reset store", async () => {
        expect(rootStore.dataStore.data.length).toBe(0);
        mockRefetch = jest.spyOn(rootStore.dataStore.query, "refetch");
        mockRefetch.mockReturnValue(Promise.resolve({data: {games: [mockGame]}}))
        await rootStore.dataStore.getMoreData();
        expect(rootStore.dataStore.data.length).toBe(1);
        rootStore.dataStore.resetStore();
        expect(rootStore.dataStore.data.length).toBe(0);
        expect(rootStore.dataStore.pageNumber).toBe(0);
    });

    it("should set searchstring", async () => {
        expect(rootStore.dataStore.searchString).toBe("");
        rootStore.dataStore.setSearchString("hello");
        expect(rootStore.dataStore.searchString).toBe("hello");
    });

    it("should update sort", async () => {
        expect(rootStore.dataStore.sort.ascending).toBe(true);
        expect(rootStore.dataStore.sort.type).toBe(SortType.NONE);
        rootStore.dataStore.setSort(SortType.NAME, false);
        expect(rootStore.dataStore.sort.ascending).toBe(false);
        expect(rootStore.dataStore.sort.type).toBe(SortType.NAME);
        expect(rootStore.dataStore.resetable).toBeTruthy();
    });

    it("should get error on getting data", async () => {
        expect(rootStore.dataStore.error).toBeUndefined();
        mockRefetch = jest.spyOn(rootStore.dataStore.query, "refetch");
        mockRefetch.mockReturnValue(Promise.reject(new ApolloError({})));
        await rootStore.dataStore.getMoreData();
        await new Promise(process.nextTick);
        expect(rootStore.dataStore.error).not.toBeUndefined();
    });
});