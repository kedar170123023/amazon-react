/* state = cartItems : []

action = loding, products, error

 payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: qty,
      },

 */

import { ADD_TO_CART, ADDING_TO_CART } from "../constants";

// At One time only one item is added to cart

function cartReducer(state = { cartItems: [] }, action) {
  console.log(action.type);
  switch (action.type) {
    // initially loading
    case ADD_TO_CART:
      console.log("payload is", action.payload);
      const item = action.payload;
      // comparing if id matches
      const product = state.cartItems.find((x) => x.product === item.product);
      //   if product is already present in cart
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? product : x
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };

    case ADDING_TO_CART:
      return state;
    default:
      return state;
  }
}

export { cartReducer };

/* 

import {
  CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_EMPTY_ITEMS,
} from '../constants/cartConstants';

function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload;
      const currentItem = state.cartItems.find((x) => x.product === item.product);
      if (currentItem) {
        return {
          cartItems: state.cartItems.map((x) => (x.product === currentItem.product
            ? item : x)),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    }
    case CART_REMOVE_ITEM:
      return { cartItems: state.cartItems.filter((x) => x.product !== action.payload) };
    case CART_EMPTY_ITEMS:
      return { cartItems: [], shipping: {}, payment: {} };
    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };
    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };
    default:
      return state;
  }
}
export { cartReducer };
 */
