import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import '../Navbar.css';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  // !Function to logout the user
  const nav = useNavigate()

  const handlelogout = (e) =>{
    e.preventDefault()
    // alert("hi")
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("token")
    nav("/")
  }




  const[email,setemail] = useState("")
  
  const fetchuser = async () =>{
  const response =await fetch("http://localhost:5000/api/auth/fetchuser",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":sessionStorage.getItem("token")
                },
            })            
            const json =await response.json()
            // console.log(json)
            setemail(json.user.email)
            sessionStorage.setItem("email", json.user.email)
          }
  fetchuser()
  return (
    <div className='header'>
        <div className="logo">Expense Tracker</div>
        <div className="user">
          <div className="email">{email}</div>
          <div className="logout"><button onClick={handlelogout}>LOGOUT</button></div>
        </div>
    </div>
  )
}
