import { readFileSync, writeFileSync } from "fs"
import { TodoType } from "../../pages/types/type"

const DATA_PATH = "lib/data/todos.json"

const getList = () => {
  const todosBuffer = readFileSync(DATA_PATH)
  const todosString = todosBuffer.toString()
  if (!todosString) {
    return []
  }
  const todos: TodoType[] = JSON.parse(todosString)
  return todos
}

const exist = ({ id }: { id: number }) => {
  const todos = getList()
  const todo = todos.some((todo) => todo.id === id)
  return todo
}

const write = (todos: TodoType[]) => {
  writeFileSync(DATA_PATH, JSON.stringify(todos))
}

export default { getList, exist, write }