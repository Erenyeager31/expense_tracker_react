import React from 'react'
 /*{ useEffect, useState,useContext }*/ 
import '../Homepage.css'
// import ExpenseContext from '../context/ExpenseContext'
import Expense from './Expense';
import Filter_stats from './Filter_stats';
// import Alerts from './Alerts';
// import PropTypes from 'prop-types'


export default function Homepage(props) {
 
  // const expense_context = useContext(ExpenseContext)
  // const { expense, fetch_expense } = expense_context
  // // console.log(expense)

  // useEffect(()=>{
  //   fetch_expense();
  //   const id = setInterval(() => {
  //     fetch_expense();
  //   }, 10000);
  //     // eslint-disable-next-line
  // },[])

  return (
    <>
    {/* <Alerts message="Hello" alert={true}/> */}
      <div className="container_1">
        {/* left part of the page starts from here */}
        <Filter_stats/>
        <Expense/>
      </div>

      <div className="feedback">
        <p>For any complaints or feedback you can mail me at <span>dishantshah3133@gmail.com</span></p>
      </div>
    </>
  )
}
