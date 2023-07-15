import React, { useState, useContext, useEffect } from 'react'
import FilterContext from '../context/FilterContext'
import ExpenseContext from '../context/ExpenseContext'

export default function Filter_stats() {
  // !Creating a list for all the categories 
  const category = ["Credit-card Bill","Books","stationary","Groceries"]
  const category_stage = ["lifetime","current_f","previous_f"]

  // !creating state for the statistics
  const stats_initial = []
  const[stats,setstats] = useState(stats_initial)

  // !importing context for expense
  const expense_context = useContext(ExpenseContext)
  //eslint-disable-next-line
  const { expense, fetch_expense } = expense_context

  // !Importing context for filter
  const filtercontext = useContext(FilterContext)
  // console.log(filtercontext)
  const { filter_result, fetch_filter } = filtercontext
  // console.log(stats)

  const fetch_stats = async ()=>{
    const response = await fetch("http://localhost:5000/api/expense/fetch_stats",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "email":sessionStorage.getItem("email")
      }
    })
    const data = await response.json()
    setstats(data)
    // console.log(data)

    // console.log(data[category[0]]["lifetime"])
  }


  // console.log(stats[category[0]])

  useEffect(() => {
    //eslint-disable-next-line
    fetch_filter([]);
    fetch_stats()
    //eslint-disable-next-line
  },[])
  

  // ! handler and usestate for the filter
  const [filter, setfilter] = useState({
    keyword: "",
    filter_category: "",
    min_val: "",
    max_val: ""
  });

  const handlechange = (e) => {
    // console.log("hi")
    setfilter({ ...filter, [e.target.name]: e.target.value })
  }
  // !The filter part ends here 

  // !Handling Submission of the filter form

  const handlefiltersubmit = async (e) => {
    e.preventDefault();
    fetch_filter(filter.keyword, filter.filter_category, filter.min_val, filter.max_val)
  }

  // !The handling ends here

  // !The part used for the deletion of the expense
  const handledelete = async (id) => {
    // console.log(id)  
    const response = await fetch("http://localhost:5000/api/expense/delete_expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    })
    const json = await response.json()
    if (json.success === true) {
      //   alert("Note deleted Succesfully")
    }
    fetch_expense()
    fetch_stats()
    fetch_filter(filter.keyword, filter.filter_category, filter.min_val, filter.max_val)
  }
  // !The deletion part ends here

  return (
    <div className="lefttab">
      {/* Filter part starts from here */}
      <div className="upper">
        <div className="filter">
          <div className="filter_label">Filter</div>
          <form className="filter_options" onSubmit={handlefiltersubmit}>
            <div className="search">
              <input onChange={handlechange} name='keyword' value={filter.keyword} type="text" className="search_box" placeholder='Enter the Keyword You want to search' />
            </div>
            <div className="filter_category_wrap">
              <select value={filter.category} onChange={handlechange} name="filter_category" id="filter_category" className='filter_category' placeholder='Enter the Category you wish to search for'>
                <option value="" selected>Select category</option>
                <option value="stationary">Stationary</option>
                <option value="Books">Books</option>
                <option value="Groceries">Groceries</option>
                <option value="Credit-card Bill">Credit-card Bill</option>
              </select>
            </div>
            <div className="min"><input onChange={handlechange} name='min_val' value={filter.min_val} type="text" className="min_value" placeholder='Enter the Min Amount' /></div>
            <div className="max"><input onChange={handlechange} name='max_val' value={filter.max_val} type="text" className="max_value" placeholder='Enter the Max Amount' /></div>
            <div className="search_filter"><button type="submit" className="search_button">SEARCH</button></div>
          </form>
        </div>
        {/* filter part ends here */}
        {/* Stats starts from here */}
        <div className="stats">
          <div className="stats_label">STATS</div>
          <div className='stats_list'>
            {/* {stats["Groceries"].lifetime} */}
            <div className="stats_wrap">
              <label htmlFor="statslabel" className="statslabel">CURRENT FISCAL YEAR : </label>
              <div className="stats_val">{stats['current-fiscal']}</div>
            </div>
            <div className="stats_wrap">
              <label htmlFor="statslabel" className="statslabel">PREVIOUS FISCAL YEAR : </label>
              <div className="stats_val">{stats['previous-fiscal']}</div>
            </div>
            <div className="stats_wrap">
              <label htmlFor="statslabel" className="statslabel">LIFETIME EXPENSE : </label>
              <div className="stats_val">{stats['lifetime-expense']}</div>
            </div>

            {/* Creating a map to show categoryws=ise expense */}
            <div className="category_wise">
            {stats.length === 0 && 'No Stats to Display'}
                <p className='categorywise_label'>CATEGORY-WISE EXPENSE</p>
              {/* lifetime expense by category */}
              <div className="category_ol_label">
                <p>LIFETIME EXPENSE</p>
                <ol>
                {stats.length ===0 || category.map(
                  (category)=>{
                    return <li>{category} : {stats[category][category_stage[0]]}</li>
                  }
                )}
                </ol>
              </div>

              <div className="category_ol_label">
                <p>CURRENT FISCAL EXPENSE</p>
                <ol>
                {stats.length ===0 || category.map(
                  (category)=>{
                    return <li>{category} : {stats[category][category_stage[1]]}</li>
                  }
                )}
                </ol>
              </div>

              <div className="category_ol_label">
                <p>PREVIOUS FISCAL EXPENSE</p>
                <ol>
                {stats.length ===0 || category.map(
                  (category)=>{
                    return <li>{category} : {stats[category][category_stage[2]]}</li>
                  }
                )}
                </ol>
              </div>
            </div>
            {/* The mapping ends here */}
          </div>
        </div>
        {/* Stats ends here */}
      </div>
      <div className="filter_area">
        <div className="filter_head">Filtered Results</div>
        <div className="filter_list">
          <div className='labels'>
            <div className="date">Date</div>
            <div className="cat">Category</div>
            <div className="ename">Name</div>
            <div className="eamt">Amount</div>
          </div>
          <div>
            {filter_result.length === 0 && 'Please select the Filters to Display'}
          </div>
          {filter_result.map(
            (filter_result) => {
              return <div key={filter_result._id} className="filter_item">
                <div className="timestamp">{filter_result.timestamp.slice(0, 10)}</div>
                <div className="exp_cat">{filter_result.category}</div>
                <div className="exp_n">{filter_result.expense_name}</div>
                <div className="exp_a">{filter_result.amount}</div>
                <div className="delete">
                  <button type='submit' onClick={() => { handledelete(filter_result._id) }}>DELETE</button>
                </div>
              </div>
            }
          )
          }
        </div>
      </div>
    </div>
  )
}
