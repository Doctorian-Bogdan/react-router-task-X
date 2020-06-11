/* eslint-disable import/no-duplicates */
import express from 'express'
import path from 'path'
import cors from 'cors'
import shortid from 'shortid'
import bodyParser from 'body-parser'

import cookieParser from 'cookie-parser'
import Html from '../client/html'

const port = process.env.PORT || 3000
const server = express()

const { readdirSync } = require('fs')
const { readFile, writeFile } = require('fs').promises

server.use(cors())

const wrFile = async (category, tasks) => {
  await writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify(tasks, 1, 2), {
    encoding: 'utf8'
  })
}

const rFile = (category) => {
  return readFile(`${__dirname}/tasks/${category}.json`, { encoding: 'utf8' })
    .then((data) => JSON.parse(data))
    .catch(() => [])
}

const getTasks = (tasks) => {
  return tasks.reduce((acc, rec) => {
    // eslint-disable-next-line no-underscore-dangle
    if (rec._isDeleted) {
      return acc
    }
    return [...acc, { taskId: rec.taskId, title: rec.title, status: rec.status }]
  }, [])
}

server.use(express.static(path.resolve(__dirname, '../dist/assets')))
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
server.use(bodyParser.json({ limit: '50mb', extended: true }))

server.use(cookieParser())

server.get('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  const tasks = getTasks(await rFile(category))
  res.json(tasks)
})

server.get('/api/v1/tasks/:category/:timespan', async (req, res) => {
  const { category, timespan } = req.params
  const tasks = await rFile(category)
  const periodOfTime = {
    day: 1000 * 60 * 60 * 24,
    week: 7 * 1000 * 60 * 60 * 24,
    month: 30 * 1000 * 60 * 60 * 24
  }
  const filteredTasks = getTasks(
    // eslint-disable-next-line no-underscore-dangle
    tasks.filter((el) => el._createdAt + periodOfTime[timespan] > +new Date())
  )
  res.json(filteredTasks)
})

server.post('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  if (Object.keys(req.body).length === 0) {
    await wrFile(category, [])
  } else {
    const newTask = {
      taskId: shortid.generate(),
      title: req.body.title,
      status: 'new',
      _isDeleted: false,
      _createdAt: +new Date(),
      _deletedAt: null
    }
    const tasks = await rFile(category)
    const updatedTasks = [...tasks, newTask]
    await wrFile(category, updatedTasks)
    res.json({ status: 'success', newTask })
  }
})

server.patch('/api/v1/tasks/:category/:id', async (req, res) => {
  const { id, category } = req.params
  const newStatus = req.body
  const statuses = ['new', 'in progress', 'done', 'blocked']
  if (statuses.includes(newStatus.status)) {
    const tasks = await rFile(category)
    const newTaskList = tasks.map((el) => (el.taskId === id ? { ...el, ...newStatus } : el))
    await wrFile(category, newTaskList)
    const updatedTask = getTasks(newTaskList.filter((el) => el.taskId === id))
    res.json(...updatedTask)
  } else {
    res.status(501)
    res.json({ status: 'error', message: 'incorrect status' })
  }
})

server.delete('/api/v1/tasks/:category/:id', async (req, res) => {
  const { id, category } = req.params
  const tasks = await rFile(category)
  const newTaskList = tasks.map((el) => (el.taskId === id ? { ...el, _isDeleted: true } : el))
  await wrFile(category, newTaskList)
  res.json({ status: 'success' })
})

server.get('/api/v1/categories', async (req, res) => {
  const categoryList = readdirSync(`${__dirname}/tasks`).map((el) => el.split('.json')[0])
  res.send(categoryList)
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

server.get('/', (req, res) => {
  // const body = renderToString(<Root />);
  const title = 'Server side Rendering'
  res.send(
    Html({
      body: '',
      title
    })
  )
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

server.listen(port)

console.log(`Serving at http://localhost:${port}`)
