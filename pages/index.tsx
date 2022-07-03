import type { NextPage } from 'next'
import TodoList from './components/TodoList'
import { TodoType } from './types/type'
import { getTodosAPI } from '../lib/api/todo'
import { preload } from './todo/todoSlice'
import wrapper from '../store'

interface IProps {
  todos: TodoType[]
}

const Home: NextPage<IProps> = ({ todos }) => {
  return <TodoList todos={todos}/>
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({
  req, res, ...etc
}) => {
  try {
    const {data} = await getTodosAPI()
    store.dispatch(preload(data))
    return { props: { todos: data}} 
  } catch (e) {
    console.log(e)
    return { props: { todos: [] }}
  }
})

export default Home
