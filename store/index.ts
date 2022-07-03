import logger from 'redux-logger';
import { configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import todoReducer from '../pages/todo/todoSlice'

const devMode = process.env.NODE_ENV === 'development';

const reducer = combineReducers({
  todo: todoReducer
})

const rootReducer = (state : any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    }
    if (state.count) nextState.count = state.count
    return nextState
  } else {
    return reducer(state, action)
  }
}

export type RootState = ReturnType<typeof reducer>

const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: devMode,
  })
}

const wrapper = createWrapper(makeStore, {debug: devMode})

export default wrapper
