import React, { useState } from 'react'
import '../login.css'
// import '/Users/Dishant/Desktop/Reactjs/Expense_tracker/expense_tracker/src/login.css'
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const nav = useNavigate();

    const[credentials,setcredentials] = useState({
        email:"",
        password:""
    });

        const handlesubmit = async (e) =>{
            // alert("login")
            e.preventDefault();
            // console.log("we are here")
            const response = await fetch("http://localhost:5000/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({email:credentials.email,password:credentials.password} )
            })            
            const json = await response.json()
            // console.log(json);

            if(json.success){
                // !If the login is cussesfull then we will use the api fetch_user to fetch the email of the user 
                //! and then save it into the sessionstorage so it can be used to verify in App.js if an authorized user is
                //! trying to access the homepage without login

                //saving the auth token
                sessionStorage.setItem("token",json.authtoken)
                const response =await fetch("http://localhost:5000/api/auth/fetchuser",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token":sessionStorage.getItem("token")
                },
            })            
            const json_ = await response.json()
            sessionStorage.setItem("email", json_.user.email)
                nav("/Homepage")
            }
        }

        const onchange = (e) =>{
            setcredentials({...credentials,[e.target.name]:e.target.value})
        }

    return (
        <div className="container">
            <div className="left">
                <div className="content">
                    <h2 className="greeting">Hey ! Welcome Back</h2>
                    <p className="message">In order to Track your Expenses Please login</p>
                    <div className="button_signup">
                        <a href='/Signup' className="signup">Sign Up</a>
                    </div>
                </div>

            </div>
            <div className="right">
                <form action="" className="login_container" onSubmit={handlesubmit}>
                    <h3 className='heading'>LOGIN PAGE</h3>
                    <div className="username">
                        <input type="text" name="email" id="email" onChange={onchange} value={credentials.email} className='email' placeholder='Email' />
                    </div>
                    <div className="password">
                        <input type="password" name="password" id="password" onChange={onchange} value={credentials.password} className='password' placeholder='Password' />
                    </div>
                    <div className="forgot">
                        <p>forgot password ?</p>
                    </div>
                    <div className="submit">
                        <button type='submit' className="submit_b">LOGIN</button>
                    </div>

                </form>
            </div>
        </div>
    )
}
