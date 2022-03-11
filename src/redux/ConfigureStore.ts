import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./module";

export default function configStore() {
  const myCreateStore = applyMiddleware(thunkMiddleware)(createStore);
  const store = myCreateStore(rootReducer);

  return store;
};
