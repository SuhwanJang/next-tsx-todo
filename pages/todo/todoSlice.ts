import { createSlice } from '@reduxjs/toolkit'
import { TodoType } from '../types/type'

export interface ITodoState {
  todos: TodoType[]
}

const initialState: ITodoState = {
  todos: []
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    preload: (state, action) => {
      return { ...state, todos: action.payload }
    }
  }
})

const { actions, reducer } = todoSlice
export const { preload } = actions

export default reducer