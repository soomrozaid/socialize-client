import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
});

function getState() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return initialState;
    }
    const preparedState = JSON.parse(serializedState);
    return {
      ...initialState,
      user: preparedState,
    };
  } catch (err) {
    console.log(err);
    return initialState;
  }
}

const state = getState();

const store = createStore(
  reducers,
  state,
  applyMiddleware(...middleware)
);

export default store;
