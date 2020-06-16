import React from 'react'
import TaskListItem from './tasklistitem'

const TaskList = (props) => {
  const [newTask, setNewTask] = React.useState('')
  return (
    <div className="text-center bg-teal-200 border-green-800 border-2 box-border p-10 rounded-md">
      <p className="font-bold text-2xl text-green-900">Tasks:</p>
      <div className="my-4">
        <button
          type="button"
          className="pr-1 pl-4 py-1 bg-green-500 rounded-l-lg border-t-2 border-l-2 border-b-2 border-green-700 hover:bg-green-400 transition duration-200"
          onClick={() => props.timeFilter('all')}
        >
          All
        </button>
        <button
          type="button"
          className="pr-1 pl-1 py-1 bg-green-500 border-b-2 border-t-2 border-green-700 hover:bg-green-400 transition duration-200"
          onClick={() => props.timeFilter('month')}
        >
          Month
        </button>
        <button
          type="button"
          className="pr-1 pl-1 py-1 bg-green-500 border-b-2 border-t-2 border-green-700 hover:bg-green-400 transition duration-200"
          onClick={() => props.timeFilter('week')}
        >
          Week
        </button>
        <button
          type="button"
          className="pr-4 pl-1 py-1 bg-green-500 rounded-r-lg border-b-2  border-t-2  border-r-2 border-green-700 hover:bg-green-400 transition duration-200"
          onClick={() => props.timeFilter('day')}
        >
          Day
        </button>
      </div>
      <ul>
        {props.taskList.map((el) => (
          <li key={el.taskId} className="my-3">
            <TaskListItem
              title={el.title}
              status={el.status}
              updateStatus={props.updateStatus}
              updateTitle={props.updateTitle}
              elId={el.taskId}
            />
          </li>
        ))}
      </ul>
      <input
        type="text"
        className="bg-green-300 border-green-600 border-2 rounded focus:outline-none pl-3 my-2"
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        type="button"
        className="block mx-auto bg-green-400 box-border py-2 px-12 transition duration-500 hover:bg-teal-200 rounded-lg border-4 border-green-400 font-bold"
        onClick={() => props.addTask(newTask)}
      >
        Add
      </button>
    </div>
  )
}

export default TaskList
