import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { wordsSlice } from "./slices/words/wordsSlice";
import { wordsApiSlice } from "./slices/wordsApi/wordsApiSlice";

const rootReducer = combineSlices(wordsSlice, wordsApiSlice);

export type RootState = ReturnType<typeof rootReducer>;
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["words", "wordsApi"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = (preloadedState?: Partial<RootState>) => {
	const store = configureStore({
		//reducer: rootReducer,
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware({
				serializableCheck: false,
			}).concat(wordsApiSlice.middleware);
		},
		//preloadedState,
	});
	setupListeners(store.dispatch);
	return store;
};

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	unknown,
	Action
>;
