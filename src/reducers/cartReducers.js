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

import { ADD_TO_CART, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constants";

// At One time only one item is added to cart
// cartItems contains already contained payload
function cartReducer(state = { cartItems: [], shipping : {}, payment : {}  }, action) {
  console.log(action.type);
  switch (action.type) {
    // initially loading
    case ADD_TO_CART:
      // console.log("payload is", action.payload);
      // console.log("payload already", state.cartItems);

      const item = action.payload;
      // comparing if id matches
      const product = state.cartItems.find((x) => x.product === item.product);
      //   if product is already present in cart

      // console.log("previous cart", product);
      if (product) {
        const newcart = {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
        // console.log("newcart is ", newcart);
        return newcart;
      }
      return { cartItems: [...state.cartItems, item] };

    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING :
      return {...state, shipping : action.payload}

    case CART_SAVE_PAYMENT :
      return {...state, payment : action.payload}
    default:
      return state;
  }
}



export { cartReducer };
