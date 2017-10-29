import { createStore as reduxCreateStore } from "redux";
import fire from "../fire";

const reducer = (state, action) => {
  if (action.type === `INCREMENT`) {
    return Object.assign({}, state, {
      count: state.count + 1
    });
  }

  if (action.type === `SET_CURRENT_USER`) {
    console.log(action.shop);

    return {
      ...state,
      userId: action.user,
      shop_name: action.shop,
      shop_coast: action.coast
    }

  }

  if (action.type === `LOGOUT_USER`) {
    fire.auth().signOut();
    return {
      ...state,
      userId: "",
      account_username: "",
      shop_city: "",
      shop_name: "",
      shop_phone: "",
      shop_state: "",
      shop_website: "",
      user_email: "",
      paypal_email: "",
      shop_coast: ""
    };
  }

  return state;
};

const initialState = {
  count: 0,
  userId: "",
  account_username: "",
  shop_city: "",
  shop_name: "",
  shop_phone: "",
  shop_state: "",
  shop_website: "",
  user_email: "",
  paypal_email: "",
  shop_coast: ""
};

const createStore = () => reduxCreateStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default createStore;
