import React from 'react'

const TaskListItem = (props) => {
  const [editMode, setEditMode] = React.useState(false)
  const [taskName, setTaskName] = React.useState(props.title)
  return (
    <div>
      <div>
        {editMode ? (
          <span>
            <button
              type="button"
              className="bg-green-300"
              onClick={() => props.updateTitle(taskName, props.elId)}
            >
              Save
            </button>
            <input
              type="text"
              className="bg-teal-200"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </span>
        ) : (
          <span>
            <button type="button" className="bg-green-400" onClick={() => setEditMode(true)}>
              Edit
            </button>
            <span>{props.title}</span>
          </span>
        )}
      </div>
      <div>
        {props.status === 'new' ? (
          <button type="button" onClick={() => props.updateStatus(props.elId, 'in progress')}>
            in progress
          </button>
        ) : (
          ''
        )}
        {props.status === 'in progress' ? (
          <div>
            <button type="button" onClick={() => props.updateStatus(props.elId, 'done')}>
              done
            </button>
            <button type="button" onClick={() => props.updateStatus(props.elId, 'blocked')}>
              blocked
            </button>
          </div>
        ) : (
          ''
        )}
        {props.status === 'blocked' ? (
          <button type="button" onClick={() => props.updateStatus(props.elId, 'in progress')}>
            blocked
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default TaskListItem
