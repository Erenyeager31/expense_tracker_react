import React, { useState } from 'react'
import '../Homepage.css'
// import PropTypes from 'prop-types'
function RenderingArrayOfObjects() {
  const data = [
    {
      "State": "Uttar Pradesh",
      "Capital": "Lucknow"
    },
    {
      "State": "Gujarat",
      "Capital": "Gandhinagar"
    },
    {
      "State": "Karnataka",
      "Capital": "Bengaluru"
    },
    {
      "State": "Punjab",
      "Capital": "Chandigarh"
    },
    {
      "State": "Maharashtra",
      "Capital": "Mumbai"
    }
  ]
  const listItems = data.map(
    (element) => {
      return (
        <ul type="disc">
          <li style={{
            fontWeight: 'bold',
            color: 'red'
          }}
          >
            {element.State}
          </li>
          <li>{element.Capital}</li>
        </ul>
      )
    }
  )
  // const value = <div> "dishant"</div>
  return (
    <div>
      {listItems}
    </div>
  )
}

export default function Homepage(props) {

  // ! handler and usestate for the filter
  const[filter,setfilter] = useState({
    keyword:"",
    filter_category:"",
    min_val:"",
    max_val:""
  });


  const handlechange = (e) =>{
    // console.log("hi")
    setfilter({...filter,[e.target.name]:e.target.value})
  }
  // !The filter part ends here

  // !the usestate and handler for the expense form
  const[expense_detail,setexpense] = useState({
    category:"",
    expensename:"",
    expenseamount:""
  })

  const handleform = (e) =>{
    setexpense({...expense_detail,[e.target.name]:e.target.value})
  }
  // !The form part ends here

  //!This part handles submission for the form
  const expense_submit = async (e) =>{
    e.preventDefault();
    // console.log(expense_detail.category)
    const response = await fetch("http://localhost:5000/api/expense/save_expense",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "email":localStorage.getItem("email")
      },
      body: JSON.stringify({expensename:expense_detail.expensename,expenseamount:expense_detail.expenseamount,category:expense_detail.category})
    })
    const json = await response.json()
    console.log(json)
  }
  // console.log(localStorage.getItem("email"))
  // !The submission part ends here 

  return (
    <>
      <div className="container_1">
        {/* left part of the page starts from here */}
        <div className="lefttab">
          {/* Filter part starts from here */}
          <div className="filter">
            <div className="filter_label">Filter</div>
            <div className="filter_options">
              <div className="search">
                <input onChange={handlechange} name='keyword' value={filter.keyword} type="text" className="search_box" placeholder='Enter the Keyword You want to search' />
              </div>
              <div className="filter_category_wrap">
                <select value={filter.category} onChange={handlechange} name="filter_category" id="filter_category" className='filter_category' placeholder='Enter the Category you wish to search for'>
                  <option value="none" selected disabled>Select category</option>
                  <option value="stationary">Stationary</option>
                  <option value="Books">Books</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Credit-card Bill">Credit-card Bill</option>
                </select>
              </div>
              <div className="min"><input onChange={handlechange} name='min_val' value={filter.min_val} type="text" className="min_value" placeholder='Enter the Min Amount'/></div>
              <div className="max"><input onChange={handlechange} name='max_val' value={filter.max_val} type="text" className="max_value" placeholder='Enter the Max Amount'/></div>
            </div>

          <div className="search_filter"><button type="submit" className="search_button">SEARCH</button></div>
          </div>
          {/* filter part ends here */}
          {/* Stats starts from here */}
          <div className="stats">
            <div className="stats_label">STATS</div>
          </div>
          {/* Stats ends here */}
        </div>
        <div className="expensearea">
          <div className="expensehead">
            Expense List
          </div>
          <div className="expenselist">
            <RenderingArrayOfObjects />
          </div>
          <form action="" className="expenseinput" onSubmit={expense_submit}>
            <div className="expensecategory_wrap">
              {/* <label htmlFor="" className="expensecategory_l">Category</label> */}
              <div className="category_sel">
                <select onChange={handleform} value={expense_detail.category} name="category" id="expensecategory" className='expensecategory' placeholder='Select the Category'>
                  <option value="none" selected disabled>Select category</option>
                  <option value="stationary">Stationary</option>
                  <option value="Books">Books</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Credit-card Bill">Credit-card Bill</option>
                </select>
              </div>
            </div>
            <div className="expensename_wrap">
              {/* <label htmlFor="" className="expensename_l">Expense Name</label> */}
              <input placeholder='Expense Name' onChange={handleform} value={expense_detail.expensename} type="text" name='expensename' className="expensename" />
            </div>
            <div className="expenseamount_wrap">
              {/* <label htmlFor="" className="expenseamount_l">Amount</label> */}
              <input placeholder='Expense Amount' onChange={handleform} value={expense_detail.expenseamount} type="text" name='expenseamount' className="expenseamount" />
            </div>
            <div className="save">
              <button type="submit" className="save_button">Save</button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}
