import { ApolloClient, NormalizedCacheObject, ObservableQuery } from "@apollo/client";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { GET_SINGLE_GAME } from "../graphQL";
import { Game } from "../types";
import { client } from "../util";
import { RootStore } from "./rootStore";

/**
 * Store handling the modal and data fetching for it
 */
export class ModalStore {
    selectedGame: number = -1;
    game: Game | undefined;
    showModal: boolean = false;
    updating: boolean = false;
    rootStore: RootStore;
    query: ObservableQuery;

    constructor(rootStore: RootStore, inClient: ApolloClient<NormalizedCacheObject> = client) {
        this.rootStore = rootStore;
        this.query = inClient.watchQuery({
            query: GET_SINGLE_GAME
        });
        makeObservable(this, {
            game: observable,
            showModal: observable,
            updating: observable,
            selectGame: action,
            unSelectGame: action,
            updateGameData: action,
            resetable: computed
        });
    }

    get resetable(): boolean {
        if (this.selectedGame > -1 || this.game) return true;
        return false;
    }

    selectGame(appId: number) {
        this.query.refetch({
            appId: appId
        }).then(action("getSuccess", ({data}) => {
            this.game = data.game as Game;
            this.showModal = true;
            this.selectedGame = appId;
        }))
    }

    updateGameData() {
        if (this.selectedGame === -1) return;
        this.updating = true;
        this.query.refetch({
            appId: this.selectedGame
        }).then(action("getSuccess", ({ data }) => {
            this.game = data.game as Game;
            this.updating = false;
        }));
    }

    unSelectGame() {
        runInAction(() => {
            this.showModal = false;
            this.game = undefined;
            this.selectedGame = -1;
        })
    }

    resetStore() {
        this.selectedGame = -1;
        this.game = undefined;
        this.showModal = false;
        this.updating = false;
    }
}