import { BrowserRouter, Route, Switch } from "react-router-dom";
import Homepage from "./Components/background/Homepage";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/navbar/NavBar";
import Project from "./Components/project/Project"; 
import Campaign from "./Components/campaign/Campaign";
import Contact from "./Components/navbar/contact";
import Admin from "./Components/Register-as/admin/admin";
import BenSignup from "./Components/Register-as/Beneficiary/bensignup";
import DonorSignup from "./Components/Register-as/Donar/Donorsignup";
import Admindash from "./Components/Register-as/admindash";
import Benlog from "./Components/Register-as/Beneficiary/benlog"
import Createcamp from "./Components/Register-as/Beneficiary/createcamp"
import Donarlog from "./Components/Register-as/Donar/Donarlog"
import Donar from "./Components/Register-as/Donar/donar"
import Transaction from "./Components/Register-as/Donar/Transaction"
import TransactionHistory from "./Components/Register-as/Beneficiary/TransactionHistory"
import Description from "./Components/Description/Description"
import { useState } from "react";
import { useEffect } from "react";
import { isWallectConnected, getEtheriumContract, ethereum, } from "./services/blockchain";
import {setGlobalState,useGlobalState} from ".//store"


function App() {
  const [projects] = useGlobalState('projects')
  const [project] = useGlobalState('project')
  const [backers] = useGlobalState('backers')
  const [donor, setLoginDonor] = useState({});
  const [beneficiary, setLoginBeneficiary] = useState({});
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  const benLoggedIn = window.localStorage.getItem("isBenLoggedIn");
  

 
  return (
    <BrowserRouter>
    <NavBar/>
    <Switch>
      <Route exact path="/"><Homepage/></Route>
      <Route path="/project" >
      {
        donor&&loggedIn?<Project projects= {projects}/>:<Donarlog setLoginDonor={setLoginDonor}/>
      }
      </Route>
      
      <Route path="/contact"><Contact/></Route> 
      <Route path="/campaign">
        {
          beneficiary&&benLoggedIn? <Campaign projects= {projects}/>:<Benlog setLoginBeneficiary={setLoginBeneficiary}/> 
        }
        </Route>
      <Route path="/bensignup" ><BenSignup/></Route>
      <Route path="/Donorsignup"><DonorSignup/></Route> 
      <Route path="/admin"><Admin/></Route>
      <Route path="/admindash"><Admindash projects= {projects}/></Route>
      <Route path="/benlog"><Benlog setLoginBeneficiary={setLoginBeneficiary}/></Route>
      {/* <Route path="/createcamp"><Createcamp/></Route> */}
      <Route path="/donarlog"><Donarlog setLoginDonor={setLoginDonor}/></Route>
      <Route path="/donar"><Donar/></Route>
      <Route path="/transaction"><Transaction  backers= {backers}/></Route>
      <Route path="/transactionhistory"><TransactionHistory projects= {projects}/></Route>
      <Route path={"/description/:id"}><Description project= {project} backers= {backers}/></Route>

      <Route path='*'><div><h1>Page not found</h1></div></Route>
    </Switch>
   
      
      <Footer/>
    </BrowserRouter>
    
  );
}

export default App;

