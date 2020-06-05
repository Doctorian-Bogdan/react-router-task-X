import React from 'react'

const TaskList = (props) => {
  return (
    <div>
      {props.taskList.map((el) => (
        <div>{el.title}</div>
      ))}
    </div>
  )
}

export default TaskList
