import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../admin/admin.css"
import axios from 'axios';
import {test1} from './test'
import {useHistory} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import login from './login'
export default function Donarlog({setLoginDonor}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('username and password are required');
      return;
    }
    // Add code to submit login credentials
  };
    
  const history = useHistory();

  const login = ()=>{
    const donor = {username, password};
    if(username&&password){
      axios.post("http://localhost:9002/Donorlog",donor) 
       .then(res=>
        {toast.error(res.data.message,{position:"top-center", theme:'colored'})
          setLoginDonor(res.data.donor)
          // history.push("/project")
          window.localStorage.setItem("isLoggedIn",true)
          test1()
        })
    }
    else{
      toast.error("invalid input",{position:"top-center", theme:'colored'});
    }
    
  }
  
  return (
    <div className='body'>
        {error && <p>{error}</p>}
        <div className="login-wrap">
        <div className="login-html">
            <input id="tab-1" type="radio" name="tab" className="sign-in" checked/><label for="tab-1" className="tab">Sign In <label id='asben'>as Donor</label></label>
            <input id="tab-2" type="radio" name="tab" className="sign-up"/><label for="tab-2" className="tab"></label>
            <div className="login-form">
                <form className="sign-in-htm" onSubmit={handleLogin}>
                    <div className="group">
                        <label for="user" className="label">username</label>
                        <input
                            type="username"
                            id="username"
                            className='input'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            />
                    </div>
                    <div className="group">
                        <label for="pass" className="label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className='input'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                    </div>
                    {/* <div className="group">
                        <input id="check" type="checkbox" className="check" checked/>
                        <label for="check"><span className="icon"></span> Keep me Signed in</label>
                    </div> */}
                    <div className="group">
                    <input className="button" type="submit" value="Sign in" onClick={login} />
                    </div>
                    <Link className="btn nav-link" to="/Donorsignup" >Create new account here</Link>
                    <Link className="btn nav-link" to="/" >Back to Home</Link>
                </form>
            </div>
        </div>
    </div>
    {/*  */}
    <ToastContainer/>
    </div>
    
  )
  
}
        
    