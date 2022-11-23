import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RootStore } from "../rootStore";

describe("test rootStore", () => {
    let mockWatchQuery: any;
    it("should reset all stores", async () => {
        const mockApollo = new ApolloClient({
            cache: new InMemoryCache()
        });
        const rootStore = new RootStore(mockApollo);
        
        mockWatchQuery = jest.spyOn(mockApollo, "watchQuery");
        mockWatchQuery.mockReturnValue({
            refetch: async (variables: any) => (Promise.resolve({data: {games: [], game: undefined}}))
        });

        rootStore.dataStore.pageNumber = 4;
        expect(rootStore.enableResetButton).toBeTruthy();
        rootStore.resetStores(false);
        expect(rootStore.enableResetButton).toBeFalsy();
    });
});