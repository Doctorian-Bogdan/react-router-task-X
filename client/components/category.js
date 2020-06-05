import React from 'react'
import { Link } from 'react-router-dom'

const Category = (props) => {
  return (
    <div>
      {props.categoryList.map((el) => (
        <div>
          <Link to={`/${el}`}>{el}</Link>
        </div>
      ))}
    </div>
  )
}

export default Category
