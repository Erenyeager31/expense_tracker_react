import React, { useEffect, useState,useContext } from 'react'
// import '../Expense.css'
import ExpenseContext from '../context/ExpenseContext'
// import AlertContext from '../context/AlertContext'

export default function Expense() {

  // console.log(ExpenseContext)
  const expense_context = useContext(ExpenseContext)
  const { expense, fetch_expense } = expense_context
  // console.log(expense)

  useEffect(()=>{
    fetch_expense();
      // eslint-disable-next-line
  },[])
    
  // ?the usestate and handler for the expense form
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
        "email":sessionStorage.getItem("email")
      },
      body: JSON.stringify({expensename:expense_detail.expensename,expenseamount:expense_detail.expenseamount,category:expense_detail.category})
    })
    const json = await response.json()
    // console.log(json)
    setexpense({
      category:"",
      expensename:"",
      expenseamount:""
    }) 
    // window.location.reload(true)
    fetch_expense()
    // localStorage.setItem("alertstate",true)
    // localStorage.setItem("message","Data saved")
    // console.log(localStorage.getItem("alertstate"))
  }
  // console.log(localStorage.getItem("email"))
  // !The submission part ends here  

  // !The part used for the deletion of the expense
  const handledelete =async (id) =>{
    console.log(id)  
    const response = await fetch("http://localhost:5000/api/expense/delete_expense",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({id:id})
    })  
    const json = await response.json()
    if(json.success === true){
    //   alert("Note deleted Succesfully")
    }
    // window.location.reload(true)
    fetch_expense()
    // alert(setalert)
    // console.log(expense)
  }
  // !The deletion part ends here
  return (
        <div className="expensearea">
          <div className="expensehead">
            Expense List
          </div>
          <div className="expenselist">
          <div className='labels'>
            <div className="date">Date</div>
            <div className="cat">Category</div>
            <div className="ename">Name</div>
            <div className="eamt">Amount</div>
            </div>
            <div>
            {expense.length ===0 && 'No expense to Display'}
            </div>
              { expense.map(
                (expense) =>{
                  return <div key={expense._id} className="expense_item">
                      <div className="timestamp">{expense.timestamp.slice(0,10)}</div>
                      <div className="exp_cat">{expense.category}</div>
                      <div className="exp_n">{expense.expense_name}</div>
                      <div className="exp_a">{expense.amount}</div>
                      <div className="delete">
                        <button type='submit' onClick={() => {handledelete(expense._id)}}>DELETE</button>
                      </div>
                  </div>
                })}
          </div>
          <form action="" className="expenseinput" onSubmit={expense_submit}>
            <div className="expensecategory_wrap">
              <div className="category_sel">
                <select defaultValue={expense_detail.category} value={expense_detail.category} onChange={handleform}  name="category" id="expensecategory" className='expensecategory' placeholder='Select the Category'>
                  <option value="none" hidden> Please Select an Option</option>
                  <option value="Books">Books</option>
                  <option value="stationary">Stationary</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Credit-card Bill">Credit-card Bill</option>
                </select>
              </div>
            </div>
            <div className="expensename_wrap">
              <input placeholder='Expense Name' onChange={handleform} value={expense_detail.expensename} type="text" name='expensename' className="expensename" />
            </div>
            <div className="expenseamount_wrap">
              <input placeholder='Expense Amount' onChange={handleform} value={expense_detail.expenseamount} type="text" name='expenseamount' className="expenseamount" />
            </div>
            <div className="save">
              <button type="submit" className="save_button">Save</button>
            </div>

          </form>
        </div>
  )
}
