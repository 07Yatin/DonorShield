import React from 'react'
// import img0 from '../css/back.jpg'
import "./home.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from '../img/log.png'
import img2 from '../img/img-02.jpg'
import { Link } from 'react-router-dom';
import img3 from '../img/img-03.jpg'
import { useEffect } from 'react'
import { connectWallet, isWallectConnected, loadProjects } from '../../services/blockchain'
// const img0=new URL("../css/back.jpg",import.meta.url)
export default function Homepage() {
  return (
    <div>
            <div className="bg">
                <div className="textbg">
                    <h1 className="h1">DONATE</h1>
                    <h2 className="h2"> <span>For the Poor People</span> </h2>
                    <h3 className="h">Be the change you want to see in<br/> the world.</h3> 
                    <div className="btttn">
                        <button className="botn" >
                            <Link className="link" to="/benlog">Join Us</Link> 
                        </button>
                    </div>
                
                </div>
            </div>
        
        <div className="container tm-container-2">
            <div className="row" > 
                <div className="col-lg-12">
                    <h2 className="tm-welcome-text">Welcome!</h2>
                </div>
            </div>
            <div className="row tm-section-mb">
                <div className="col-lg-12">
                    <div className="tm-timeline-item">
                        <div className="tm-timeline-item-inner">
                            <div className="tm-timeline-description-wrap">
                                <img src={img1} alt="/" className=" tm-img-timeline"/>
                                <div className="tm-bg-dark-light tm-timeline-description">
                                    <h3 className="tm-text-green tm-font-400">For all the donors</h3>
                                    <p>To show the donors all the charity projects available and to let them choose and vote for the ones convincing and agreeing with them</p>
                                    <div className=" tm-btn-send float-lg-right">Login</div>
                                </div>
                            </div>
                        </div>
                        <div className="tm-timeline-connector-vertical"></div>
                    </div>
                    <div className='Space'></div>
                    </div>
                    <div className="tm-timeline-item">
                        <div className="tm-timeline-item-inner">
                            <div className="tm-timeline-description-wrap">
                                <img src={img2} alt="/" className="tm-img-timeline"/>
                                <div className="tm-bg-dark-light tm-timeline-description">
                                    <h3 className="tm-text-cyan tm-font-400">For the Necessary Commodities</h3>
                                    <p>To shop and buy all the required necessities from the website itself in our very own co-operative store</p>
                                    <div className=" tm-btn-send float-lg-right">Store</div>
                                </div>
                            </div>
                        </div>
                        <div className="tm-timeline-connector-vertical"></div>
                        <div className='Space'></div>
                    </div>
                    <div className='Space'></div>
                    <div className="tm-timeline-item">
                        <div className="tm-timeline-item-inner">
                            <div className="tm-timeline-description-wrap">
                                <img src={img3} alt="/" className="tm-img-timeline"/>
                                <div className="tm-bg-dark tm-timeline-description">
                                    
                                    <h3 className="tm-text-yellow tm-font-400">For all Beneficiaries' Info</h3>
                                    <p>To display the entire list of Beneficiaries who have registered on the website for help of any kind, needed on a daily basis</p>
                                    <div className=" tm-btn-send float-lg-right" >Beneficiary</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

  )
}
