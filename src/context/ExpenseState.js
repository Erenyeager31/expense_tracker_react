import { useState } from 'react'
import ExpenseContext from './ExpenseContext'

import React from 'react'

export default function ExpenseState(props) {
    // const host = "http://localhost:5000"
    const expense_initial = []
    const[expense,setexpense] = useState(expense_initial)

    //?Fetching all the notes
    const fetch_expense = async () =>{  

          const response = await fetch("http://localhost:5000/api/expense/fetch_expenses",{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body: JSON.stringify({email:sessionStorage.getItem("email")})
          })
          const json = await response.json()
          // const data = await json.data
          setexpense(json.data)
        }
  return (
    <ExpenseContext.Provider value={{expense,fetch_expense}}>
        {props.children}
    </ExpenseContext.Provider>
  )
}

