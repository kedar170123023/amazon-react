import axios from "axios";
import { ADD_TO_CART } from "../constants";
const addToCart = (productId, qty) => async (dispatch) => {
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
  } catch (err) {
    console.log(err);
  }
};

export { addToCart };

/* import Cookies from "js-cookie";
import axios from "axios";

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "../constants"; */

/*  it takes two parameters which product to add and its quantity */
// getState is used to get current state
/* 
const addToCart = (productId, qty) => async (dispatch, getState) => {
  // save data into product
  const { data: product } = await axios.get(`/api/products/${productId}`);
  
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: product._id,
      image: product.image,
      name: product.name,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    },
  });

  // save cart in cartItems
  const {
    cart: { cartItems },
  } = getState();
  Cookies.set("cartItems", JSON.stringify(cartItems));
};

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  const {
    cart: { cartItems },
  } = getState();
  Cookies.set("cartItems", JSON.stringify(cartItems));
};

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};

export { addToCart, removeFromCart, saveShipping, savePayment };
 */
