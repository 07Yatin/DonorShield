import React from 'react'
import { Link } from 'react-router-dom'
import ud1 from './ud1.jpg'
import './donar.css'
export default function donar() {
  return (
        <div className="containe">
        
        <main className='mainclass'>
            <div className="post-content">
                <div className="image" >
                    <img src={ud1} alt="" />
                    {/* <!-- <div className="publish">
                        <div>By: Sushil Yadav&nbsp;&nbsp;</div>
                        <div>On June 18 2022</div>
                    </div> --> */}
                </div>
                <div className="title">
                    <h2>Poor children waiting for charity</h2>
                </div>
                <div className="content">
                    <div className="description">
                        <p>A few weeks ago we introduced you to Milkman, one of our partners in the creation of what
                            will be Días de Campo. As has already happened in other of our events, if there is an
                            opportunity to help someone and the initiative is good at theBasement we go with everything.
                            On this occasion, Milkman proposed the creation of a stand where he could contribute and
                            help one of the NGOs that are doing the best job in his country. This organization is
                            Pratham and is responsible for providing means so that children can receive a good
                            education.</p>
                    </div>
                </div>

            </div>
        </main>

        <aside className="side-post">
            <h3>Choose your monthly gift</h3>
            <div className="done">
                <div className="don1row">
                    
                        <button className="but4"><Link className='link' to="">500 ₹</Link></button>
                        <button className="but2"><Link className='link' to="">300 ₹</Link> </button>
                        <button className="but3"><Link className='link' to="">500 ₹</Link></button>
                    
                </div>
                <div className="don2row">
                        <button className="but4"><Link className='link' to="">500 ₹</Link></button>
                        <button className="but2"><Link className='link' to="">300 ₹</Link> </button>
                        <button className="but3"><Link className='link' to="">500 ₹</Link></button>
                </div>
                <div className="subb">
                    <button type="submit" className="subut"><Link className='link' to="">Give Donation</Link></button>
                </div>
                
            </div>

        </aside>
    </div>

  )
}
