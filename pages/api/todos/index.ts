// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TodoType } from '../../types/type'
import Data from "../../../lib/data";
import fs from 'fs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const todos = Data.todo.getList()
      res.statusCode = 200
      return res.send(todos)
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.send(e)
    }
  }
  else if (req.method === "POST") {
    const { text, color } = req.body
    if (!text || !color) {
      res.statusCode = 400
      return res.send("text 혹은 body가 없습니다.")
    }
    const todos = Data.todo.getList()
    let todoId = todos.length == 0 ? 1 : todos[todos.length - 1].id + 1
    const newTodo = {
      id : todoId,
      text,
      color,
      checked: false
    }
    Data.todo.write([...todos, newTodo])
    res.statusCode = 200
    res.end()
  }
  res.statusCode = 405
  return res.end()
  /*
  if (req.method === 'GET') {
    try {
      const todos = await new Promise<TodoType[]>((resolve, reject) => {
        fs.readFile("lib/data/todos.json", (err, data) => {
          if (err) {
            return reject(err.message)
          }
          const todosData = data.toString()
          if (!todosData) {
            return resolve([])
          }
          const todos = JSON.parse(data.toString())
          return resolve(todos)
        })
      })
      res.statusCode = 200
      return res.send(todos)
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.send(e)
    }
  }
  */
}
