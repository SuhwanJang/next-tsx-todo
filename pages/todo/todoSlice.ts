import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TodoType } from '../types/type'

interface ITodoState {
  todos: TodoType[]
}

const initialState: ITodoState = {
  todos: []
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<TodoType[]>) => {
      state.todos = action.payload
    }
  }
})

const { actions, reducer } = todoSlice
export const { set } = actions

export default reducer