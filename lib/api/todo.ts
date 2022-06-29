import axios from '.'
import { TodoType } from '../../pages/types/type'

export const getTodosAPI = () => axios.get<TodoType[]>('api/todos')
export const checkTodoAPI = (id: number) => axios.patch(`api/todos/${id}`)