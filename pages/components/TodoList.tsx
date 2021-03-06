import styled from 'styled-components'
import { TodoType } from '../types/type'
import palette from '../../styles/palette'
import { useMemo, useState } from 'react'
import { AiOutlineCheck } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { checkTodoAPI, deleteTodoAPI } from '../../lib/api/todo';
import { useSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { set } from '../todo/todoSlice';

const Container = styled.div`
  width: 100%;
  .todo-list-header {
    padding: 12px;
    border-bottom: 1px solid ${palette.gray};

    .todo-list-last-todo {
      font-size: 14px;
    }

    .todo-list-header-colors {
      display: flex;
      .todo-list-header-color-num {
        display: flex;
        margin-right: 8px;
        p {
          font-size: 14px;
          line-height: 16px;
          margin: 0;
          margin-left: 6px;
        }
        .todo-list-header-round-color {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
      }
    }
  }
  .todo-list {
    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width:100%;
      height: 52px;
      border-bottom: 1px solid ${palette.gray};

      .todo-left-side {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        .todo-color-block {
          width: 12px;
          height: 100%;
        }
        .checked-todo-text {
          color: ${palette.gray};
          text-decoration: line-through;
        }
        .todo-text {
          margin-left: 12px;
          font-size: 16px;
        }
      }
      .todo-right-side {
        display: flex;
        margin-right: 12px;

        svg {
          &:first-child {
            margin-right: 16px;
          }
        }

        .todo-trash-can {
          width: 16px;
          path {
            fill: ${palette.deep_red}
          }
        }
        .todo-check-mark {
          fill: ${palette.deep_green}
        }
        .todo-button {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid ${palette.gray};
          background-color: transparent;
          outline: none;
        }
      }
    }
  }
  .bg-blue {
    background-color: ${palette.blue};
  }
  .bg-green {
    background-color: ${palette.green};
  }
  .bg-navy {
    background-color: ${palette.navy};
  }
  .bg-orange {
    background-color: ${palette.orange};
  }
  .bg-red {
    background-color: ${palette.red};
  }
  .bg-yellow {
    background-color: ${palette.yellow};
  }
`

interface IProps {
  todos: TodoType[]
}

type ObjectIndexType = {
  [key: string]: number | undefined
}

const TodoList: React.FC<IProps> = () => {
  const todos = useSelector((state) => state.todo.todos)
  const dispatch = useDispatch()
  const todoColorNums = useMemo(() => {
    const colors: ObjectIndexType = {};
    todos.forEach(todo => {
      if (!colors[todo.color]) {
        colors[`${todo.color}`] = 1;
      } else {
        (colors[`${todo.color}`] as number)++;
      }
    })
    return colors
  }, [todos])
  const checkTodo = async (id: number) => {
    try {
      await checkTodoAPI(id)
      // router.reload() - ??????????????? ?????? ????????? ?????? ??????
      // or router.push("/") - ?????????????????? ?????????????????? ???????????? setServerSideProps ??? ??????
      // state ????????? ?????? ???????????? api ?????? ??????
      const newTodos = todos.map((todo) => todo.id === id ? { ...todo, checked: !todo.checked} : todo)
      dispatch(set(newTodos))
    } catch (e) {
      console.log(e)
    }
  }
  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoAPI(id)
      const newTodos = todos.filter((todo) => todo.id !== id)
      dispatch(set(newTodos))
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Container>
      <div className="todo-list-header">
        <p className="todo-list-last-todo">
          ?????? TODO <span>{todos.length}???</span>
        </p>
        <div className="todo-list-header-colors">
          {Object.keys(todoColorNums).map((color, index) => (
            <div className="todo-list-header-color-num" key={index}>
              <div className={`todo-list-header-round-color bg-${color}`} />
              <p>{todoColorNums[color]}???</p>
            </div>
          ))
          }
        </div>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <div className="todo-left-side">
              <div className={`todo-color-block bg-${todo.color}`} />
              <p className={`todo-text ${
                todo.checked ? "checked-todo-text" : ""
              }`}>
                {todo.text}
              </p>  
            </div>
            <div className="todo-right-side">
              {todo.checked && (
                <>
                  <BsTrash className="todo-trash-can" onClick={() => deleteTodo(todo.id)}/>
                  <AiOutlineCheck className="todo-check-mark" onClick={() => checkTodo(todo.id)}/>
                </>
              )}
              {!todo.checked && (
                <button type="button" className="todo-button" onClick={() => checkTodo(todo.id)}/>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default TodoList;