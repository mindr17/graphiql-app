import { combineReducers, configureStore } from '@reduxjs/toolkit';

import editorReducer from './reducers/editor/editor-slice';

const rootReducer = combineReducers({
  editor: editorReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default store;
