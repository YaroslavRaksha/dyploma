const initialState = {
    selectedStoreId: '493e3dd3-e29c-4302-8b31-33de6e3db74e',
    selectedStoreName: 'e2bdb2-2.myshopify.com',
    allStores: null,
}

const SET_ALL_STORES = 'SET_ALL_STORES';
const SET_SELECTED_STORE = 'SET_SELECTED_STORE';

export default function storeData(state = initialState, action) {
    switch(action.type) {

        case SET_SELECTED_STORE:
            const { id, name } = action.payload;
            return {
                ...state,
                selectedStoreId: id,
                selectedStoreName: name,
            }

        case SET_ALL_STORES:
            const { stores } = action.payload;
            return {
                ...state,
                allStores: stores,
            }
        default:
            return state;
    }
}

export const setSelectedStore = (payload) => ({type: SET_SELECTED_STORE, payload: payload });

export const setAllStores = (payload) => ({type: SET_ALL_STORES, payload: payload });
