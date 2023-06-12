import React from 'react'
import "./description.css"
import './donatorbox.css'
import { FaEthereum } from "react-icons/fa";
import back  from '../img/back1.jpg'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { loadProject, backProject, getBackers } from '../../services/blockchain'
import { truncate, useGlobalState, setGlobalState, daysRemaining } from '../../store'
import { useState } from 'react'
import { createProject } from '../../services/blockchain'
import Popup from  "../campaign/popup"
import { toast, ToastContainer } from 'react-toastify'
import Moment from 'react-moment';
const Description = ({ project, backers }) => {
    const [buttonPopup,setButtonPopup] = useState(false); 
    const { id } = useParams()
      loadProject(id)
      getBackers(id)
    useEffect(()=>{
        loadProject(id)
        getBackers(id)
    },[])
    console.log(backers)
  return (
    <div className="containe">

            <main className='mainclass'>
                <div className="post-content">
                    <div className="post">
                        <div className="post-image" >
                            <img src={project?.imageURL} alt="" />
                        </div>
                        <div className="post-detail">
                            <div className="post-info">
                                <div className="post-title">{project?.title}</div>
                                <span className='dayleft'> {new Date().getTime() > Number(project?.expiresAt + '000') ? 'Expired' : daysRemaining(project?.expiresAt)+ ' left' }</span>
                                <div className="ethid">
                                    <h3 className='headh3'> {truncate(project?.owner,4,4,11)}</h3>&nbsp;&nbsp;
                                    <span>1 Backings</span>
                                    <span className='prostatus'>
                
                                        {project.status == 0 ? (<div className="status">open</div>)
                                        :project.status == 1 ? (<div className="status">Accepted</div>)
                                        :project.status == 2 ? (<div className="status">Reverted</div>)
                                        :project.status == 3 ? (<div className="status">Deleted</div>)
                                        :(<div className="status">paid</div>)}
                                    
                                    </span>
                                </div>
                                <div className="post-desc">
                                    {project.description}
                                </div>
                                <Progressbar bgcolor="green" progress={`${(project?.raised/project?.amount)*100}`} height={25} />
                                <div className="eth">
                                    <div className="raiseth">
                                        {project?.raised} ETH Raised
                                    </div>
                                    <div className="needeth">
                                    <FaEthereum/> 
                                    
                                    {project?.amount} ETH
                                    </div>

                                </div>
                                <button className='probutton' type="submit" onClick={()=>{setButtonPopup(true)}}>
                                Donate
                                </button>
                                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                                <DonatorBox project={project}/>
                                </Popup>

                            </div>
                        </div>
                    </div>
                    <table className='tabl'>
                        <thead>
                            <tr>
                                <th> Donor </th>
                                <th> Donations </th>
                                <th> Refunded </th>
                                <th> Time </th>
                            </tr>

                        </thead>
                        <tbody>
                        {backers.map((backer)=>(
                            <tr>
                            <td>{truncate(backer?.owner,4,4,11)}</td>
                            <td> <FaEthereum/> {backer?.contribution} ETH </td>
                            <td> {backer?.refunded ?'Yes':'No'} </td>
                            <td> <Moment fromNow>{backer.timestamp}</Moment> </td>
                        </tr>
                        ))}
                        </tbody>
                    </table>

                  
                    
                </div>
               
            </main>


        </div>
  )
}



const DonatorBox=({project})=>{
  const [amount, setAmount]= useState('');

  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(!amount) return

    await backProject(project?.id, amount)
    toast.success("Donated successfully",{position:"top-center", theme:'colored'})

    const reset=()=>{
      setAmount('')
    }
    reset()
    
  }
  return (
          <div className="formbold-main-wrapper">
            {/* <!-- Author: FormBold Team -->
            <!-- Learn More: https://formbold.com --> */}
            <div className="formbold-form-wrapper">
              <h2>{project.title} &nbsp;&nbsp;</h2>
              <form onSubmit={handleSubmit}>
               
                 
                  <div className="formbold-mb-5">
                    <label for="phone" className="formbold-form-label">  Amount </label>
                    <input type="number" 
                    name="amount" 
                    id="phone" 
                    placeholder="Enter Target Amount"
                    onChange={(e)=>setAmount(e.target.value)}
                    value={amount} 
                    className="formbold-form-input" required/>
                  </div>
                

                <div>
                  <button type="submit" className="formbold-btn">Donate </button>
                </div>
              </form>
            </div>
            <ToastContainer/>
            
          </div>
   
  )
}

const Progressbar = ({bgcolor,progress,height}) => {
     
    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: 0
      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
       borderRadius:40,
        textAlign: 'right'
      }
      
      const progresstext = {
        padding: 10,
        color: 'white',
        fontWeight: 400
      }

      return (
        <div style={Parentdiv}>
          <div style={Childdiv}>
            <span style={progresstext}>{`${progress}%`}</span>
          </div>
        </div>
        )
}


export default Description