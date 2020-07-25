import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL
} from "../constants";
import axios from "axios";

// retuns a function which also returns a function
// in payload we are sending data and error messages
const listProducts = () => async (dispatch) => {
  try {
    console.log("trying to get product with id");
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ tyoe: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const saveProduct = (product) => async(dispatch, getState)=>{
  try { 
    dispatch({type:PRODUCT_SAVE_REQUEST, payload : product});
    const {userSignin : {userInfo}} = getState();
    const {data} = await axios.post('/api/products',product, {headers : {
      'Authorization' : 'Bearer '+userInfo.token
    }});
    dispatch({type:PRODUCT_SAVE_SUCCESS, payload : data });

  } catch(err){
    dispatch({type: PRODUCT_SAVE_FAIL, payload : err.message});
  } 
}

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get("/api/products/" + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err.message });
  }
};

export { listProducts, detailsProduct, saveProduct };
