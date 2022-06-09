//configStore.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import Mgz from "./modules/mgz";
import User from "./modules/user";

const middlewares = [thunk];
const rootReducer = combineReducers({ Mgz, User });
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;