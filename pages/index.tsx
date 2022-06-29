import { Axios } from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import TodoList from './components/TodoList'
import { TodoType } from './types/type'
import { getTodosAPI } from '../lib/api/todo'

interface IProps {
  todos: TodoType[]
}

const Home: NextPage<IProps> = ({ todos }) => {
  return <TodoList todos={todos}/>
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const {data} = await getTodosAPI()
    return { props: {todos: data} }
  } catch (e) {
    console.log(e);
    return { props: {todos: []} }
  }
}

export default Home
