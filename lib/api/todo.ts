import axios from '.'
import { TodoType } from '../../pages/types/type'

export const getTodosAPI = () => axios.get<TodoType[]>('api/todos')