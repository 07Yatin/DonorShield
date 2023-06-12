import { Link } from 'react-router-dom'
import "./transactionhistory.css"
import { useParams } from 'react-router-dom'
import React, { useState } from "react";
import { useEffect } from 'react'
import { loadProject, backProject, getBackers, loadProjects } from '../../../services/blockchain';
import { truncate, useGlobalState, setGlobalState, daysRemaining } from '../../../store'
import Moment from 'react-moment';
import { FaEthereum } from "react-icons/fa";
import address from '../../../artifacts/contractAddress.json'

const TransactionHistory=({ projects})=>{
    const contractAddress = address.address
    useEffect(()=>{
        loadProjects()
    },[])
    const { id } = useParams()
    return(
        <>
        <section class="recent">
                <div class="activity-grid">
                    <div class="activity-card">
                        <h3>Transaction History</h3>

                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>ExpiresAt</th>
                                        <th>Amount Raised</th>
                                        <th>To</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  
                                  {projects.map((project)=>(
                                            <tr>
                                            <td>{project.title}</td>
                                            <td> {new Date().getTime() > Number(project.expiresAt + '000') ? 'Expired' : daysRemaining(project.expiresAt)+ ' left' } </td>
                                            <td> <FaEthereum/> {project?.raised} ETH </td>
                                            <td> {truncate(contractAddress,4,4,11)} </td>
                                            <td>
                                          <span class="badge warning">Processing</span>
                                      </td>
                                            
                                        </tr>
                                        ))}
                                     
                                  
                                     
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
        </section>
        </>
    )
}

export default TransactionHistory