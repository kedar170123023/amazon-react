import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
} from "../constants";

/* state = products : []

action = loding, products, error

*/

function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    // initially loading
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    // if success set loading false and products are in the action
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      // error is also in payload
      return { loading: false, error: action.payload };
    default:
      // otherwise send initial state
      return state;
  }
}

/* state = product : {}

action = loding, product, error

*/

function productDetailsReducer(state = { product: {} }, action) {
  switch (action.type) {
    // initially loading
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    // if success set loading false and products are in the action
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      // error is also in payload
      return { loading: false, error: action.payload };
    default:
      // otherwise send initial state
      return state;
  }
}

function productSaveReducer(state = { product: {} }, action) {
  switch (action.type) {
    // initially loading
    case PRODUCT_SAVE_REQUEST:
      return { loading: true };
    // if success set loading false and products are in the action
    case PRODUCT_SAVE_SUCCESS:
      return { loading: false, success : true, product: action.payload };
    case PRODUCT_SAVE_FAIL:
      // error is also in payload
      return { loading: false, error: action.payload };
    default:
      // otherwise send initial state
      return state;
  }
}

export { productListReducer, productDetailsReducer, productSaveReducer };
