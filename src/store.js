import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
} from "./reducers/productReducers";



import Cookie from 'js-cookie';
import { cartReducer } from "./reducers/cartReducers";
import {userSigninReducer, userRegisterReducer} from './reducers/userReducers'
import thunk from "redux-thunk";
// HERE WE CREATE STORE


const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const initialState = { cart : {cartItems}, userSignin : {userInfo : userInfo } };
// reducer responsible for combining all reducers created in reducers
const reducer = combineReducers({
  // for accessing product list
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productSave: productSaveReducer,
  cart: cartReducer,
  userSignin : userSigninReducer,
  userRegister : userRegisterReducer,

});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
