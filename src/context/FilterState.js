import { useState } from 'react'
import FilterContext from './FilterContext'

import React from 'react'

export default function FilterState(props) {
  // const host = "http://localhost:5000"
  const filter_initial = []
  const [filter_result, setfilter] = useState(filter_initial)

  const fetch_filter = async (keyword, category, min, max) => {
    // console.log(keyword+category+min+max)
    const response = await fetch("http://localhost:5000/api/expense/filter_fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "email": sessionStorage.getItem("email")
      },
      body: JSON.stringify({ keyword: keyword, category: category, min: min, max: max })
    })
    const json = await response.json()
    // console.log(json.data)
    setfilter(json.data)
  }
  return (
    <FilterContext.Provider value={{ filter_result, fetch_filter }}>
      {props.children}
    </FilterContext.Provider>
  )
}

