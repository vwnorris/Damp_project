import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { RootStore } from "../rootStore";

describe("test filterStore", () => {
    let rootStore: RootStore;
    let mockApollo: ApolloClient<NormalizedCacheObject>;

    beforeAll(async () => {
        mockApollo = new ApolloClient({
            cache: new InMemoryCache()
        });
        rootStore = new RootStore(mockApollo);
    });
    
    beforeEach(async () => {
        rootStore.filterStore.resetStore();
    });

    it("should be able to add filters and remove filters", async () => {
        expect(Array.from(rootStore.filterStore.activeFilters).length).toBe(0);
        rootStore.filterStore.addFilter("Genre", {type: "Genre", data: ["Action"], visualData: ""});
        expect(Array.from(rootStore.filterStore.activeFilters).length).toBe(1);
        expect(rootStore.filterStore.queryFilter.genre).not.toBeUndefined();
        expect(rootStore.filterStore.queryFilter.genre?.length).toBe(1);
        rootStore.filterStore.removeFilter("Genre");
        expect(Array.from(rootStore.filterStore.activeFilters).length).toBe(0);
        expect(rootStore.filterStore.queryFilter.genre).toBeUndefined();
    });
    
    it("should get correct filterQuery", async () => {
        rootStore.filterStore.addFilter("Genre", {type: "Genre", data: ["Action"], visualData: ""});
        rootStore.filterStore.addFilter("Price", {type: "Price", data: [0, 10], visualData: ""});
        rootStore.filterStore.addFilter("ReleaseDate", {type: "ReleaseDate", data: [null, new Date()], visualData: ""});
        rootStore.filterStore.addFilter("Achievements", {type: "Achievements", data: 2, visualData: ""});
        rootStore.filterStore.addFilter("Tags", {type: "Tags", data: ["1980s"], visualData: ""});
        expect(rootStore.filterStore.queryFilter.genre).not.toBeUndefined();
        expect(rootStore.filterStore.queryFilter.price).not.toBeUndefined();
        expect(rootStore.filterStore.queryFilter.releasedate).not.toBeUndefined();
        expect(rootStore.filterStore.queryFilter.achivements).not.toBeUndefined();
        expect(rootStore.filterStore.queryFilter.tags).not.toBeUndefined();
    });

    it("should select and unselect filter for popup", async () => {
        const f = Array.from(rootStore.filterStore.allFilters)[0];
        rootStore.filterStore.selectFilter(f);
        expect(rootStore.filterStore.selectedFilter).toBe(f);
        expect(rootStore.filterStore.showModalInfo).toBeTruthy();
        
        rootStore.filterStore.unSelectFilter();
        expect(rootStore.filterStore.selectedFilter).toBeUndefined();
        expect(rootStore.filterStore.showModalInfo).toBeFalsy();
    });
    
    it("should be resetable when you add filter", async () => {
        expect(rootStore.filterStore.resetable).toBeFalsy();
        rootStore.filterStore.addFilter("Genre", {type: "Genre", data: ["Action"], visualData: ""});
        expect(rootStore.filterStore.resetable).toBeTruthy();
    });
    
    it("should reset store", async () => {
        rootStore.filterStore.addFilter("Genre", {type: "Genre", data: ["Action"], visualData: ""});
        expect(Array.from(rootStore.filterStore.activeFilters).length).toBe(1);
        rootStore.filterStore.resetStore();
        expect(Array.from(rootStore.filterStore.activeFilters).length).toBe(0);
    });
});