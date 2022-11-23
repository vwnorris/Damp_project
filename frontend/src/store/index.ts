import { createContext } from "react";
import { RootStore } from "./rootStore";

export const store = new RootStore()

export const defaultContext = createContext({
    store: store
});
