import { configureStore } from "@reduxjs/toolkit";
import userSlice  from "../features/userSlice";
import applicationApi from "../services/applicationApi";

// persist our store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { PERSIST, persistReducer } from "redux-persist";
//import { thunk } from "redux-thunk"

const reducer = combineReducers({
  user: userSlice,
  [applicationApi.reducerPath]: applicationApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [applicationApi.reducerPath]
}

//persisting store
const persistedReducer = persistReducer(persistConfig, reducer);

/*
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
      thunk: {
        extraArgument: {
          api: applicationApi.middleware,
        },
      },
    }),
});*/

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }).concat(applicationApi.middleware),
});

export default store