import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./admin.css"
// import login from './login'
export default function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    // Add code to submit login credentials
  };
  return (
    <div className='body'>
        {error && <p>{error}</p>}
        <div className="login-wrap">
        <div className="login-html">
            <input id="tab-1" type="radio" name="tab" className="sign-in" checked/><label for="tab-1" className="tab">Sign In</label>
            <input id="tab-2" type="radio" name="tab" className="sign-up"/><label for="tab-2" className="tab"></label>
            <div className="login-form">
                <form className="sign-in-htm" onSubmit={handleLogin}>
                    <div className="group">
                        <label for="user" className="label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className='input'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <input className="button" type="submit" value="Sign in"/><Link className='Link' to="/admindash"> </Link>
                    </div>
                    <Link className="btn nav-link" to="/signup" >Create new account here</Link>
                    <Link className="btn nav-link" to="/" >Back to Home</Link>
                </form>
            </div>
        </div>
    </div>
    {/*  */}
    </div>
    
  )
  
}
        
    