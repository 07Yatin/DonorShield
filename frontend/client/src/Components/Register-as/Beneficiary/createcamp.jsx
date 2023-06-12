import React from 'react'
import './createcampaign.css'
import { Link } from 'react-router-dom'
import announce from "./announce.png"
import { useState } from 'react'
import { createProject } from '../../../services/blockchain'
import { toast, ToastContainer } from 'react-toastify'

export default function Createcamp() {
  const [title, setTitle]= useState('');
  const [description, setDescription]= useState('');
  const [amount, setAmount]= useState('');
  const [imageURL, setImageURL]= useState('');
  const [date, setDate]= useState('');

  const toTimeStamp=(dateString)=>{
    const dateObj = Date.parse(dateString)
    return dateObj/1000
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(!title|| !description || !amount || !imageURL ||!date) return

    const params = {
      title,
      description,
      imageURL,
      amount,
      expiresAt:toTimeStamp(date)
    }
    await createProject(params)
    toast.success("project created successfully",{position:"top-center", theme:'colored'})

    const reset=()=>{
      setTitle('')
      setDescription('')
      setImageURL('')
      setAmount('')
      setDate('')
    }
    reset()
  }
  return (
          <div className="formbold-main-wrapper">
            {/* <!-- Author: FormBold Team -->
            <!-- Learn More: https://formbold.com --> */}
            <div className="formbold-form-wrapper">
              <h2>Create New Compaign &nbsp;&nbsp;<img src={announce} alt='' /></h2>
              <form onSubmit={handleSubmit}>
                <div className="formbold-mb-5">
                  <label for="phone" className="formbold-form-label"> Compaign Name </label>
                  <input type="text" 
                  name="title" 
                  id="name" 
                  placeholder="Enter Compaign Name" 
                  onChange={(e)=>setTitle(e.target.value)}
                  value={title}
                  className="formbold-form-input" required/>
                </div>
                <div className="formbold-mb-5 formbold-pt-3">
                    <label className="formbold-form-label formbold-form-label-2">
                      Compaign Description
                    </label>
                    <div className="flex flex-wrap formbold--mx-3">
                      <div className="w-full sm:w-half formbold-px-3">
                        <div className="formbold-mb-5">
                          <input type="text" 
                          name="description" 
                          id="area" 
                          placeholder="Write Compaign Description " 
                          onChange={(e)=>setDescription(e.target.value)}
                          value={description}
                          className="formbold-form-input" required/>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                  <div className="formbold-mb-5">
                    <label for="Enter Amount in Ether" className="formbold-form-label"> Image URL </label>
                    <input type="url" 
                    name="name" 
                    id="imageURL" 
                    placeholder="Image URL" 
                    onChange={(e)=>setImageURL(e.target.value)}
                    value={imageURL}
                    className="formbold-form-input" required/>
                  </div>
                  <div className="formbold-mb-5">
                    <label for="phone" className="formbold-form-label"> Target Amount </label>
                    <input type="number" 
                    name="amount" 
                    id="phone" 
                    placeholder="Enter Target Amount"
                    onChange={(e)=>setAmount(e.target.value)}
                    value={amount} 
                    className="formbold-form-input" required/>
                  </div>
                  <div className="formbold-mb-5">
                    <label for="phone" className="formbold-form-label"> End Date </label>
                    <input type="date" 
                    name="date" 
                    id="phone" 
                    placeholder="Enter Target Amount"
                    onChange={(e)=>setDate(e.target.value)}
                    value={date} 
                    className="formbold-form-input" required/>
                  </div>

                <div>
                  <button type="submit" className="formbold-btn">Create </button>
                </div>
              </form>
            </div>
            <ToastContainer/>
          </div>
   
  )
}
