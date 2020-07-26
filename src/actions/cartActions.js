import axios from "axios";
import { ADD_TO_CART, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constants";
import Cookie from "js-cookie";
const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    console.log("data for ading cart", data);
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

const saveShipping = (data)=>(dispatch)=>{
  dispatch({type : CART_SAVE_SHIPPING, payload:data})
}
const savePayment = (data)=>(dispatch)=>{
  dispatch({type : CART_SAVE_PAYMENT, payload:data})
}


export { addToCart, removeFromCart, saveShipping, savePayment };
