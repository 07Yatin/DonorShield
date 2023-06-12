import { Link } from 'react-router-dom'
import "./transaction.css"
import { useParams } from 'react-router-dom'
import React, { useState } from "react";
import { useEffect } from 'react'
import { loadProject, backProject, getBackers } from '../../../services/blockchain';
import { truncate, useGlobalState, setGlobalState, daysRemaining } from '../../../store'
import Moment from 'react-moment';
import { FaEthereum } from "react-icons/fa";
import address from '../../../artifacts/contractAddress.json'

const Transaction=({ backers, projects})=>{
    const contractAddress = address.address
    useEffect(()=>{
        getBackers(id)
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
                                        <th>From</th>
                                        <th>Time</th>
                                        <th>Amount Donated</th>
                                        <th>Refunded</th>
                                        <th>To</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  
                                  {backers.map((backer)=>(
                                            <tr>
                                            <td>{truncate(backer?.owner,4,4,11)}</td>
                                            <td> <Moment fromNow>{backer.timestamp}</Moment> </td>
                                            <td> <FaEthereum/> {backer?.contribution} ETH </td>
                                            <td> {backer?.refunded ?'Yes':'No'} </td>
                                            <td> {truncate(contractAddress,4,4,11)} </td>
                                            
                                        </tr>
                                        ))}
                                      {/* <td>
                                          <span class="badge success">Success</span>
                                      </td>
                                   */}
                                     
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
        </section>
        </>
    )
}

export default Transaction