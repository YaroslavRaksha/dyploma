const initialState = {
    cartItems: [],
    totalSum: null,
};

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const SET_QUANTITY = 'SET_QUANTITY';

export default function cartData(state = initialState, action) {
    switch(action.type) {

        case ADD_ITEM:

            const { addedItem } = action.payload;

            if(state.cartItems.find((i) => i.id === addedItem.id)) {
                return state;
            }

            return {
                ...state,
                cartItems: [...state.cartItems, {
                    ...addedItem,
                    count: 1,
                }]
            }

        case REMOVE_ITEM:
            const { removedItemId } = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== removedItemId)
            };

        case SET_QUANTITY:
            const { changedCountItemId, newCount} = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === changedCountItemId
                        ? {...item, count: newCount}
                        : item
                )
            };

        default:
            return state;
    }
};

export const addCartItem = (payload) => ({type: ADD_ITEM, payload: payload})
export const setCartItemQuantity = (payload) => ({type: SET_QUANTITY, payload: payload});
export const removeCartItem = (payload) => ({type: REMOVE_ITEM, payload: payload})

