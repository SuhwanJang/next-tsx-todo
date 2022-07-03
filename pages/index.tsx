import type { NextPage } from 'next'
import TodoList from './components/TodoList'
import { TodoType } from './types/type'
import { getTodosAPI } from '../lib/api/todo'
import { set } from './todo/todoSlice'
import wrapper from '../store'

interface IProps {
  todos: TodoType[]
}

const Home: NextPage<IProps> = ({ todos }) => {
  return <TodoList todos={todos}/>
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({}) => {
  try {
    const {data} = await getTodosAPI()
    store.dispatch(set(data))
    return { props: {}} 
  } catch (e) {
    console.log(e)
    return { props: {}}
  }
})

export default Home
