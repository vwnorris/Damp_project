import { action, computed, IObservableArray, makeObservable, observable, runInAction } from "mobx";
import { Game, SortType } from "../types";
import { LOAD_GAMES } from "../graphQL";
import { client } from "../util";
import { ApolloClient, ApolloError, NormalizedCacheObject, ObservableQuery } from "@apollo/client";
import { RootStore } from "./rootStore";

interface ISort {
    ascending: boolean;
    type: SortType;
}

/**
 * Store handling data fetching and querying the database
 */
export class DataStore {
    data: IObservableArray<Game>;
    pageNumber: number;
    searchString: string = "";
    loading: boolean;
    allFound: boolean = false;
    error: ApolloError | undefined;
    sort: ISort;
    rootStore: RootStore
    query: ObservableQuery;

    constructor(rootStore: RootStore, inClient: ApolloClient<NormalizedCacheObject> = client) {
        this.query = inClient.watchQuery({query: LOAD_GAMES});
        this.pageNumber = 0
        this.loading = false;
        this.error = undefined;
        this.data = observable.array<Game>([]);
        this.sort = {
            ascending: true,
            type: SortType.NONE
        };
        this.rootStore = rootStore;
        makeObservable(this, {
            data: observable,
            loading: observable,
            error: observable,
            allFound: observable,
            searchString: observable,
            sort: observable,
            getMoreData: action,
            reloadData: action,
            setSort: action,
            setSearchString: action,
            resetStore: action,
            resetable: computed
        });
        runInAction(() => {
            this.getMoreData();
        });
    }

    get resetable(): boolean {
        if (this.pageNumber > 1 || this.data.length > 15 || this.sort.type !== SortType.NONE) return true
        return false;
    }

    async reloadData() {
        runInAction(() => {
            this.pageNumber = 0;
            this.data.clear();
            this.allFound = false;
            this.getMoreData();
        });
    }

    setSearchString(s: string) {
        this.searchString = s;
    }

    async getMoreData() {
        const variables = {
            page: this.pageNumber,
            filter: this.rootStore.filterStore.queryFilter,
            sort: this.sort,
            search: this.searchString
        };
        this.error = undefined;
        this.loading = true;
        this.query.refetch(
            variables
        ).then(
            action("getSucces", ({data}) => {
                this.data.push(...data.games);
                this.loading = false;
                this.pageNumber++;
                if (data.games.length < 15) {
                    this.allFound = true;
                }
            })
        ).catch(action("getError", (error: ApolloError) => {
            this.error = error;
        }))
    }

    setSort(type: SortType, ascending: boolean = true) {
        this.sort.ascending = ascending;
        this.sort.type = type;
    }

    resetStore() {
        this.pageNumber = 0
        this.loading = false;
        this.error = undefined;
        this.data.clear();
        this.sort = {
            ascending: true,
            type: SortType.NONE
        };
    }

}