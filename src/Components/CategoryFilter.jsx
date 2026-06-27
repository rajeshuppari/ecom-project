import React from 'react'

const CategoryFilter = ({category,onSelect}) => {

  
  return (
    <div>
        <select name="" id="" onChange={(e)=>{onSelect(e.target.value)}}>
       <option value="">All Categories</option>
       {
        category.map((c)=>(
            <option value={c.id}>{c.name}</option>
        ))
       }
      
       </select>
    </div>
  )
}

export default CategoryFilter
