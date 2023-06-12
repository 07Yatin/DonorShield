import React from 'react'
import { Link } from 'react-router-dom'
import './admindash.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { loadProjects } from '../../services/blockchain'
import { truncate, useGlobalState, setGlobalState, daysRemaining } from '../../store'
export default function Admindash({ projects }) {
    const [approved, setApproved] = useState(false);
    const [rejected, setRejected] = useState(false);
    const { id } = useParams()
    useEffect(()=>{
        loadProjects()
      },[])

      const handleApprove = (id) => {
        setApproved(true);
        setRejected(false);
      };
    
      const handleReject = (id) => {
        setApproved(false);
        setRejected(true);
      };
    
      let status = "";
      if (approved) {
        status = "Approved";
      } else if (rejected) {
        status = "Rejected";
      }
      const color = {
        color:"grey",
        fontWeight: "bold",
        textTransform:"uppercase"
      }
  return (
    <div>
    <input type="checkbox" id="sidebar-toggle"/>
    <div className="sidebar">
        <div className="sidebar-header">
            <h3 className="brand">
                <span className="ti-unlink"></span>
                <span>Genuine Charity</span>
            </h3>
            <label for="sidebar-toggle" className="ti-menu-alt"></label>
        </div>

        <div className="sidebar-menu">
            <ul>
                <li>
                    <Link to="/admindash">
                        <span className="ti-home"></span>
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="projects.html">
                        <span className="ti-agenda"></span>
                        <span>Projects</span>
                    </Link>
                </li>
                <li>
                    <Link to="donators.html">
                        <span className="ti-clipboard"></span>
                        <span>Donators</span>
                    </Link>
                </li>
                <li>
                    <Link to="beneficiaries.html">
                        <span className="ti-folder"></span>
                        <span>Beneficiaries</span>
                    </Link>
                </li>
                <li>
                    <Link to="transaction.html">
                        <span className="ti-time"></span>
                        <span>Transaction History</span>
                    </Link>
                </li>

                <li>
                    <Link to="">
                        <span className="ti-settings"></span>
                        <span>Account</span>
                    </Link>
                </li>
            </ul>
        </div>
    </div>

    <div className="main-content">

        <header>
            <div className="search-wrapper">
                <span className="ti-search"></span>
                    <i className="fa fa-search"></i>
                    <input type="search" placeholder="Search here..."/>
            </div>

            <div className="social-icons">
                <span className="ti-bell"></span>
                <span className="ti-comment"></span>
                <div></div>
            </div>
        </header>

        <main className='main'>
            <h2 className="dash-title">Overview</h2>

            <div className="dash-cards">
                <div className="card-single">
                    <div className="card-body">
                        <span className="ti-briefcase"></span>
                        <div>
                            <h5>Projects</h5>

                        </div>
                    </div>
                    <div className="card-footer">
                        <Link to="projects.html">View all</Link>
                    </div>
                </div>

                <div className="card-single">
                    <div className="card-body">
                        <span className="ti-reload"></span>
                        <div>
                            <h5>Donators</h5>

                        </div>
                    </div>
                    <div className="card-footer">
                        <Link to="donators.html">View all</Link>
                    </div>
                </div>

                <div className="card-single">
                    <div className="card-body">
                        <span className="ti-check-box"></span>
                        <div>
                            <h5>Benificiaries</h5>

                        </div>
                    </div>
                    <div className="card-footer">
                        <Link to="beneficiaries.html">View all</Link>
                    </div>
                </div>
            </div>

            <section className="recent">
            <div class="summary">
                        <div class="summary-card">
                            <div class="summary-single">
                                <span class="ti-id-badge"></span>
                                <div>
                                    <h5>196</h5>
                                    <small>Number of donors</small>
                                </div>
                            </div>
                            <div class="summary-single">
                                <span class="ti-calendar"></span>
                                <div>
                                    <h5>16</h5>
                                    <small>Number of Beneficiaries</small>
                                </div>

                            </div>
                            
                        </div>

                        
                       
                </div>
                <div className="activity-grid">
                    <div className="activity-card">
                        <h3>Recent activity</h3>

                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Purpose</th>
                                        <th>Target</th>
                                        <th>Request Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { projects.map((project, i)=>(
                                <ProjectTitle key={project.id} project={project} handleApprove={handleApprove} handleReject={handleReject} />
                                ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    
                    
                </div>
             
                


            </section>


        </main>

    </div>
    </div>
  )
}

const ProjectTitle = ({ project, handleApprove, handleReject, status, color  }) =>(
    <>
   
        <tr>
            <td>{project.title}</td>
            <td>{project.description}</td>
            <td>{project.amount} ETH</td>
            <td>     
            {!status && (
                    <div>
                    <button style={{backgroundColor: 'green', color: 'white', padding:'.1rem .5rem', borderRadius:"1rem"}} onClick={handleApprove}>Approve</button> &nbsp;&nbsp;
                    <button style={{backgroundColor: 'red', color: 'white', padding:'.1rem .5rem', borderRadius:"1rem"}} onClick={handleReject}>Reject</button>
                    </div>
                )}
                {status && <p style={color}>Project {status}</p>}  
            </td>
        </tr>
    </>
)