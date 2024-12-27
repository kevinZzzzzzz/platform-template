import { configureStore } from "@reduxjs/toolkit";
import LayoutReducer from "./slice/LayoutSlice";
import BaseReducer from "./slice/BaseSlice";
import ThemeSlice from "./slice/ThemeSlice";
import storage from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["Layout", "Base", "Theme"],
};
const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Base: BaseReducer,
  Theme: ThemeSlice,
});
// 可持久化
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persister = persistStore(store);
export default store;
