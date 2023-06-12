// import React from 'react'
import { Link } from 'react-router-dom'
import "./signup.css"
import React, { useState } from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function DonorSignup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
    console.log("Username: ", username);
    console.log("Email: ", email);
    console.log("Password: ", password);
    console.log("Confirm Password: ", confirmPassword);
  };
  const history = useHistory();
  const register=()=>{
    const donor = {name,username, email, mobile, password, confirmPassword} ;
    if(name&&username&&email&&mobile&&password){
        if(password===confirmPassword){
            axios.post("http://localhost:9002/Donorsignup",donor)
            .then(res=>
                    {toast.success(res.data.message,{position:"top-center", theme:'colored'})
                    // history.push("/Donarlog")
                }
                )
        }
        else{
            toast.warn("Password and confirm password must be same",{position:"top-center", theme:'colored'});
        }
       
    }
    else{
        toast.warn("All Fields are required",{position:"top-center", theme:'colored'})
    }
    
  }
  return (
    <div className='body'>
        <div className="cont">
        <div className="title">Registration <label>as Donor</label></div>
        <div className="content">
            <form onSubmit={handleSubmit}>
                <div className="user-details">
                    <div className="input-box">
                        <span className="details">Full Name</span>
                        <input 
                        type="text" 
                        value = {name}
                        placeholder="Enter your name" 
                        onChange={(e) => setName(e.target.value)}required/>
                    </div>
                    <div className="input-box">
                        <span className="details">Username</span>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            placeholder="Enter Username"
                            onChange={(e) => setUsername(e.target.value)} required
                        />
                    </div>
                    <div className="input-box">
                        <span className="details">Email</span>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Enter your email id"
                            onChange={(e) => setEmail(e.target.value)} required
                        />
                    </div>
                    <div className="input-box">
                        <span className="details">Phone Number</span>
                        <input 
                        id="phone" 
                        type="tel" 
                        pattern="/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/" 
                        value={mobile}
                        placeholder="Enter your number" 
                        onChange={(e) => setMobile(e.target.value)}required/>
                    </div>
                    <div className="input-box">
                        <span className="details">Password</span>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)} required
                        />
                    </div>
                    <div className="input-box">
                        <span className="details">Confirm Password</span>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)} required
                        />
                    </div>
                </div>
                <div className="gender-details">
                    <input type="radio" name="gender" id="dot-1"/>
                    <input type="radio" name="gender" id="dot-2"/>
                    <input type="radio" name="gender" id="dot-3"/>
                    <span className="gender-title">Gender</span>
                    <div className="category">
                        <label for="dot-1">
                            <span className="dot one"></span>
                            <span className="gender">Male</span>
                        </label>
                        <label for="dot-2">
                            <span className="dot two"></span>
                            <span className="gender">Female</span>
                        </label>
                        <label for="dot-3">
                            <span className="dot three"></span>
                            <span className="gender">Prefer not to say</span>
                        </label>
                    </div>
                </div>
                <div className="buttonn">
                    <input className="butt" type="submit" onClick={register} value="Register"/><Link className='link' to="./Beneficary/benlog.html"></Link>
                </div>
                <div align= "center"><label>Already register? <Link to="/Donarlog" >login here</Link></label></div>
            </form>
        </div>
    </div>
    <ToastContainer/>
    </div>
  )
}
