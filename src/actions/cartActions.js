import axios from "axios";
import { ADD_TO_CART, CART_REMOVE_ITEM } from "../constants";
import Cookie from "js-cookie";
const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    // console.log(typeof data._id);
    const payload = {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: qty,
    };

    // console.log(payload);
    dispatch({
      type: ADD_TO_CART,
      payload: payload,
    });
    const {
      cart: { cartItems },
    } = getState();

    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (err) {
    console.log(err);
  }
};

const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const {
    cart: { cartItems },
  } = getState();

  Cookie.set("cartItems", JSON.stringify(cartItems));
};

export { addToCart, removeFromCart };
