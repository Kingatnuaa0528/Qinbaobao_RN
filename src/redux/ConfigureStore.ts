import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./module";

let store;

export default function configStore() {
  const myCreateStore = applyMiddleware(thunkMiddleware)(createStore);
  store = myCreateStore(rootReducer);

  return store;
};

export function getStore() {
  if(store === undefined) {
    return configStore();
  } else {
    return store;
  }
}
