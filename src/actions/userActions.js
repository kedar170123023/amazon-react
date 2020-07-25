import axios from "axios";
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL } from "../constants";
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from "../constants";
import Cookie from "js-cookie";
const signin = (email, password) => async (dispatch) => {
    dispatch({type:USER_SIGNIN_REQUEST, payload : {email, password} });
  try {
    const { data } = await axios.post(`/api/users/signin`, {
        email : email,
        password : password
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });

    Cookie.set("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({type:USER_SIGNIN_FAIL, payload : err.message });
  }
};

const register = (name, email, password) => async (dispatch) => {
    dispatch({type:USER_REGISTER_REQUEST, payload : {name, email, password} });
  try {
    const { data } = await axios.post(`/api/users/register`, {
        name : name,
        email : email,
        password : password
    });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    // no need to make it login after register
    // Cookie.set("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({type:USER_REGISTER_FAIL, payload : err.message });
  }
};

export { signin, register };
