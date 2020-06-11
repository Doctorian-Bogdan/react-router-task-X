import React from 'react'
import { Link } from 'react-router-dom'

const Category = (props) => {
  const [newCategory, setNewCategory] = React.useState('')
  return (
    <div className="text-center bg-teal-200 border-green-800 border-2 box-border p-10 rounded-md">
      {props.categoryList.map((el) => (
        <div className="my-2">
          <Link to={`/${el}`}>{el}</Link>
        </div>
      ))}
      <input
        type="text"
        className="bg-green-300 border-green-600 border-2 rounded focus:outline-none pl-3 my-2"
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button
        type="button"
        className="block mx-auto bg-green-400 box-border py-2 px-12 transition duration-500 hover:bg-teal-200 rounded-lg border-4 border-green-400 font-bold"
        onClick={() => props.addCategory(newCategory)}
      >
        Create
      </button>
    </div>
  )
}

export default Category
