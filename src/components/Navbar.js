import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import '../Navbar.css';

export default function Navbar(props) {
  // alert(localStorage.getItem("token"))
  const[email,setemail] = useState("")
  
  const fetchuser = async () =>{
  const response =await fetch("http://localhost:5000/api/auth/fetchuser",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":localStorage.getItem("token")
                },
            })            
            const json =await response.json()
            // console.log(json)
            setemail(json.user.email)
            localStorage.setItem("email", json.user.email)
          }
  fetchuser()
  return (
    <div className='header'>
        <div className="logo">Expense Tracker</div>
        <div className="menu">
          <div className="a">a</div>
          <div className="b">b</div>
          <div className="c">c</div>
        </div>
        <div className="user">
          <div className="img_wrap"><div className="avatar"> <i className="fa fa-avatar"></i> </div></div>
          <div className="email">{email}</div>
        </div>
    </div>
  )
}
