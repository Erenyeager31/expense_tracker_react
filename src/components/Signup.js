import React,{useState} from 'react'
import '../signup.css'
// import '/Users/Dishant/Desktop/Reactjs/Expense_tracker/expense_tracker/src/signup.css'

export default function Signup() {
    
    const[credentials,setcredentials] = useState({
        name:"",
        email:"",
        password:""
    })

    const handlechange = (e) =>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
        // console.log(credentials)
    }

    const handlesubmit = async (e)=>{
        e.preventDefault()

        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        })
        const json = await response.json()

        // json consists of success which is either true or false followed with error message or the Auth token 
        // console.log(json)
    }


  return (
    <div className="container">
            <div className="left_s">
                 <form action="" className="login_container_s" onSubmit={handlesubmit}>
                    <h2 className='heading_s'>SIGN UP PAGE</h2>
                    <div className="username_s">
                        <input type="text" name="name" id="username" className='username_s' placeholder='Username' onChange={handlechange} value={credentials.name}/>
                    </div>
                    <div className="email_s">
                        <input type="text" name="email" id="email" className='email_s' placeholder='Email' onChange={handlechange} value={credentials.email} />
                    </div>
                    <div className="password_s">
                        <input type="password" name="password" id="password" className='password_s' placeholder='Password' onChange={handlechange} value={credentials.password} />
                    </div>
                    <div className="forgot_s">
                        <p>forgot password ?</p>
                    </div>
                    <div className="submit_s">
                        <button type='submit' className="submit_b_s">SIGN UP</button>
                    </div>

                </form>

            </div>
            <div className="right_s">
            <div className="content_s">
                    <h3 className="greeting_s">Hey ! Welcome</h3>
                    <p className="message_s">Please Enter your Info to Create an Account</p>
                    <div className="button_login_s">
                        <a href='/' className="login_s">LOGIN</a>
                    </div>
                </div>
            </div>
        </div>
  )
}
