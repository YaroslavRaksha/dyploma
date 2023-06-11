import { createStore, combineReducers } from 'redux';
import cartData from "./reducers/cartData";
import userData from "./reducers/userData";

const rootReducer = combineReducers({
    userData: userData,
    cartData: cartData
});

const store = createStore(rootReducer);
export type RootState = ReturnType<typeof store.getState>

export default store;
