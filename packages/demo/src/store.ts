import { combineReducers, Middleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import compilationReducer from './reducers/compilationSlice'
import controlsReducer from './reducers/controlsSlice';
import editorReducer from './reducers/editorSlice';
import uiReducer from './reducers/uiSlice';

export const asyncFunctionMiddleware: Middleware<
  {},
  RootState
> = storeApi => next => action => {
  if (typeof action === 'function') {
    return action(storeApi.dispatch, storeApi.getState)
  }

  return next(action);
}

const rootReducer = combineReducers({
  compilation: compilationReducer,
  controls: controlsReducer,
  editor: editorReducer,
  ui: uiReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: [asyncFunctionMiddleware]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;