import { combineReducers, configureStore } from '@reduxjs/toolkit';

import docsReducer from './reducers/docs/docs-slice';
import explorerReducer from './reducers/explorer/explorer-slice';

const rootReducer = combineReducers({
  explorer: explorerReducer,
  docs: docsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default store;
