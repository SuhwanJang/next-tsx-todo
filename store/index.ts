import logger from 'redux-logger';
import { configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper, Context, MakeStore } from "next-redux-wrapper";
import { AnyAction, combineReducers, Store } from "redux";
import todoReducer from '../pages/todo/todoSlice'

const devMode = process.env.NODE_ENV === 'development';

const reducer = combineReducers({
  todo: todoReducer
})

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return action.payload
  } else {
    return reducer(state, action)
  }
}

const makeStore: MakeStore<Store> = (context: Context) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: devMode,
  })
  return store
}

const wrapper = createWrapper(makeStore, {debug: devMode})

export default wrapper
