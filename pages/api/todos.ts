// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TodoType } from '../types/type'
import fs from 'fs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const todos = await new Promise<TodoType[]>((resolve, reject) => {
        fs.readFile("pages/api/data/todos.json", (err, data) => {
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
}
