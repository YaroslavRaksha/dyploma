import { combineReducers, createStore } from "redux";
import storeData from "./reducers/storeData";


const rootReducer = combineReducers({
    storeData: storeData,
});

const store = createStore(rootReducer);
export type RootState = ReturnType<typeof store.getState>

export default store;
