import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaEthereum } from 'react-icons/fa';
import Moment from 'react-moment';
import Popup from '../campaign/popup';
import { toast, ToastContainer } from 'react-toastify';
import { loadProject, getBackers, backProject } from '../../services/blockchain';
import { truncate, useGlobalState, setGlobalState, daysRemaining } from '../../store';
import { connectWallet, loadProjects, isWallectConnected, getEtheriumContract, structuredProjects, structureStats, ethereum, loadProjec, acc } from '../../services/blockchain'
import './description.css';
import './donatorbox.css';
import { set } from 'mongoose';
import { random } from './test';

const Description = () => {
  const { id } = useParams(); // Extract project ID from URL
  const[load,setLoad]=useState(true);
  const [project, setProject] = useState(null);
  const [backers, setBackers] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);

  // Fetch project and backers data
  useEffect(() => {
    const fetchData = async () => {
      console.log(id)
      // const projectData = await loadProject(id);
      // const backersData = await getBackers(id);
      // const ram=parseInt(random(80))
      const projectData = {
        name:"User: "+random(20),
        expiresAt:new Date().toString(),
        title:"Project "+random(5),
        owner:"OWN: "+random(10),
        desc:"test",
        amount:100,
        raised:parseInt(random(100)),      }
      setProject(projectData);
      // setBackers(backersData);
      setLoad(false)
    };

    fetchData();
  }, []);
  if(load)
  return <>LOADING</>
  return (
    <div className="containe">
      <main className="mainclass">
        <div className="post-content">
          {/* Project Details */}
          <div className="post">
            {/* <div className="post-image">
              <img src={project?.imageURL} alt="Project" />
            </div> */}
            <div className="post-detail">
              <div className="post-info">
                <div className="post-title">{project?.title}</div>
                <span className="dayleft">
                  {new Date().getTime() > Number(project?.expiresAt + '000')
                    ? 'Expired'
                    : `${random(20)} days left`}
                </span>
                <div className="ethid">
                  <h3 className="headh3">{truncate(project?.owner, 4, 4, 11)}</h3>
                  <span> Backings</span>
                  <span className="prostatus">
                    {project?.status === 0 ? (
                      <div className="status">Open</div>
                    ) : project?.status === 1 ? (
                      <div className="status">Accepted</div>
                    ) : project?.status === 2 ? (
                      <div className="status">Reverted</div>
                    ) : project?.status === 3 ? (
                      <div className="status">Deleted</div>
                    ) : (
                      <div className="status">Paid</div>
                    )}
                  </span>
                </div>
                <div className="post-desc">{project?.description}</div>
                <Progressbar
                  bgcolor="green"
                  progress={`${parseInt((project?.raised / project?.amount) * 100)}`}
                  height={25}
                />
                <div className="eth">
                  <div className="raiseth">{project?.raised} Amount Raised</div>
                  <div className="needeth">
                    <FaEthereum /> {project?.amount} Amount
                  </div>
                </div>
                <button
                  className="probutton"
                  type="button"
                  onClick={() => setButtonPopup(true)}
                >
                  Donate
                </button>
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                  <DonatorBox project={project} />
                </Popup>
              </div>
            </div>
          </div>

          {/* Backers Table */}
          <table className="tabl">
            <thead>
              {/* <tr>
                <th>Donor</th>
                <th>Donations</th>
                <th>Refunded</th>
                <th>Time</th>
              </tr> */}
            </thead>
            <tbody>
              {backers.map((backer, index) => (
                <tr key={index}>
                  <td>{truncate(backer?.owner, 4, 4, 11)}</td>
                  <td>
                    <FaEthereum /> {backer?.contribution} ETH
                  </td>
                  <td>{backer?.refunded ? 'Yes' : 'No'}</td>
                  <td>
                    <Moment fromNow>{backer?.timestamp}</Moment>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

// DonatorBox Component
const DonatorBox = ({ project }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return;

    await backProject(project?.id, amount);
    toast.success('Donated successfully', { position: 'top-center', theme: 'colored' });

    setAmount('');
  };

  return (
    <div className="formbold-main-wrapper">
      <div className="formbold-form-wrapper">
        {/* <h2>{project?.title}</h2> */}
        <form onSubmit={handleSubmit}>
          <div className="formbold-mb-5">
            <label htmlFor="amount" className="formbold-form-label">
              Enter the Amount:
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="Enter Amount"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              className="formbold-form-input"
              required
            />
          </div>
          <div>
            <button type="submit" className="formbold-btn" onClick={()=>{alert("Donated Successfully")}}>
              Donate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ProgressBar Component
const Progressbar = ({ bgcolor, progress, height }) => {
  const Parentdiv = {
    height: height,
    width: '100%',
    backgroundColor: 'whitesmoke',
    borderRadius: 40,
    margin: 0,
  };

  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: 'right',
  };

  const progresstext = {
    padding: 10,
    color: 'white',
    fontWeight: 400,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default Description;
