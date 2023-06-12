import React, { useState } from 'react'
import hand from "../img/hand.png"
import covid from "../img/Covid.jpg"
import { Link } from "react-router-dom"
import tree from "../img/tree.JPG"
import "./project.css"
import axios from 'axios'
import { connectWallet, isWallectConnected, loadProjects, getEtheriumContract, structuredProjects, structureStats, ethereum, loadProject } from '../../services/blockchain'
import { truncate, useGlobalState, setGlobalState, daysRemaining } from '../../store'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Createcamp from  "../Register-as/Beneficiary/createcamp"
// import Popup from  "./popup"
import * as Loader from 'react-loader-spinner'
import { FaEthereum } from "react-icons/fa";
const signOut = () => {
  window.localStorage.removeItem("isLoggedIn");
  window.location.href = "/";
}

const Project=({ projects })=> {
const [buttonPopup,setButtonPopup] = useState(false); 
const [connectedAccount]= useGlobalState('connectedAccount')
  
 useEffect(()=>{
  isWallectConnected();
  loadProjects();
  
 },[])
  
  

 
  return (
    <>
     <div className='Camp'>
      <div className="flexDirection">
        <div className="charad">
          <h2> <span className="imghand"><img src={hand} alt="/" /></span>  CharityAid</h2>
          <h3 className="h3">
            Charity we using the Power of <br />
            <span>
              Crypto & Blockchain
            </span>
          </h3>
        </div>
        <div className="donorName"><h1>Hello, user</h1></div>
        <div className="profile">
          <div className="connect" onClick={connectWallet}>
           {
            connectedAccount ? ( <button className='connectbtn profilebtn'>{truncate(connectedAccount,4,4,11)}</button>)
            :( <button className='connectbtn profilebtn'>Connect Wallet</button>)
           }
            </div>
          <div className="logout"><button className='logoutbtn profilebtn' onClick={signOut}>Logout</button></div>
          <div className="txnHistory"><button className='historybtn profilebtn'><Link to="/transaction">Transaction history</Link></button></div>
        </div>
      </div>

      <div className="opencamp">
        <h2>Open Campaigns</h2>
        <hr className="ohr" />

      </div>
      <section className="articles">
           
        {projects.map((project, i)=>(
        <article>
            <ProjectCard key={i} project={project}/>
        </article>
        ))} 

      </section>
    </div>
   
    </>
  )
 }

 const ProjectCard=({ project })=>(
  <Link to={"/description/"+project.id}><div className="article-wrapper">
  <figure>
    <img src={project.imageURL} alt="" />
  </figure>
  <hr className="hr1" />
  <div className="article-body">
    <div className="timeline">
      {new Date().getTime() > Number(project.expiresAt + '000') ? 'Expired' : daysRemaining(project.expiresAt)+ ' left' }
    </div>
    <h2>{project.title}</h2>
    <h4>by {truncate(project.owner,4,4,11)}</h4>
    <div className="ethval">Raised: <FaEthereum/>{project.raised} ETH <span></span></div>

    <div className="bottom">
    <div to="#" className="read-more">
      Target :<FaEthereum/>{project.amount} ETH
    </div>
    {project.status == 0 ? (<div className="status">open</div>)
    :project.status == 1 ? (<div className="status">Accepted</div>)
    :project.status == 2 ? (<div className="status">Reverted</div>)
    :project.status == 3 ? (<div className="status">Deleted</div>)
    :(<div className="status">paid</div>)}
    </div>
    
  </div>
</div></Link>
)

export default Project
