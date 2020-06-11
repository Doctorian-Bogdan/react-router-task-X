import React from 'react'

const TaskList = (props) => {
  const [newTask, setNewTask] = React.useState('')
  return (
    <div className="text-center bg-teal-200 border-green-800 border-2 box-border p-10 rounded-md">
      {props.taskList.map((el) => (
        <div className="my-2">
          {el.title}
          {el.status === 'new' && <button type="button" onClick={() => props.updateStatus(el.taskId, 'in progress')}>In progress</button>}
          {el.status === 'in progress' && (
            <div>
              <button type="button">Block</button>
              <button type="button">Done</button>
            </div>
          )}
        </div>
      ))}
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
