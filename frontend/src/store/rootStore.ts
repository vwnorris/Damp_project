import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { action, computed, makeObservable } from "mobx";
import { client } from "../util";
import { DataStore } from "./dataStore";
import { FilterStore } from "./filterStore";
import { ModalStore } from "./modalStore";

/**
 * This class is the backbone of our store system and lets the other stores communicate.
 * It is created with mobx and has our *database* as the default client
 */
export class RootStore {
    filterStore: FilterStore;
    dataStore: DataStore;
    modalStore: ModalStore;

    constructor(inClient: ApolloClient<NormalizedCacheObject> = client) {
        this.filterStore = new FilterStore(this);
        this.dataStore = new DataStore(this, inClient);
        this.modalStore = new ModalStore(this, inClient);
        makeObservable(this, {
            enableResetButton: computed,
            resetStores: action
        });     
    }

    /** Function to see if the reset button should come or not */ 
    get enableResetButton(): boolean {
        if (this.dataStore.resetable || this.modalStore.resetable || this.filterStore.resetable) return true;
        return false;
    }

    /** Function to reset all the stores */ 
    public resetStores(reloadData: boolean = true) {
        this.filterStore.resetStore();
        this.dataStore.resetStore();
        this.modalStore.resetStore();
        if (reloadData) this.dataStore.reloadData();
    }
}