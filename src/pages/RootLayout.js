import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import classes from "./RootLayout.module.css";
import axios from "axios";
import { server } from "../assets/config";
import toast from "react-hot-toast";
import NavLogo from "./../assets/AzureMedNavLogo.png";
import ImagePlaceHolder from "./../assets/ProfileImagePlaceHolder.png"
import { useDispatch } from "react-redux";
import { userNotExists } from "../redux/reducers/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCalendarPlus, faClockRotateLeft,  faFlaskVial,  faNotesMedical, faSuitcaseMedical } from "@fortawesome/free-solid-svg-icons";

export default function RootLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/auth/logOut`, { withCredentials: true });
      dispatch(userNotExists());
      toast.success(data.message);
      navigate('/');
    }
    catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className={classes.rootLayout}>
      <nav className={classes.navbar}>
        <div className={classes.navbarFirst}>
            <button 
                className={classes.menuButton} 
                onClick={() => setSidebarOpen(prev => !prev)}
            >
                {sidebarOpen? "X":"☰"}
            </button>
            <div className={classes.navTitle}>
                <img src={NavLogo} alt="NavgationLogo"/>
            </div>
        </div>
        <button className={classes.navBarLogoutButton} onClick={handleLogOut}>Logout</button>
      </nav>

      <aside className={`${classes.sidebar} ${sidebarOpen ? classes.open : classes.close}`}>
        <SideBarComponent/>
      </aside>

      <main className={classes.mainContent}>        
        <Outlet />
      </main>
    </div>
  );
}

const Duser = {
  name : "Pragati Shrivastava",
  role : "doctor",
  email : "priya.sharma@example.com",
  phoneNumber : "9876543210",
  addr : "Health Campus, Bengaluru",
  username : "meriPragatinahihorhi",
  gender : "Female",
  spec : "Cardiologist",
  room : "B-412",
  qualification : "MBBS, MD",
  inTime: "09:00",
  outTime: "17:00",
  DOJ : "2022-05-15T00:00:00.000Z",
  test : [
    {tname: "ECG", room: "T-129"},
    {tname: "MRI SCAN", room: "T-149"},
    {tname: "Blood Test", room: "T-139"},
  ],
  hp:[
    {
      "name": "Dr. Suprit Naik",
      "degree": "MBBS, MD - General Medicine"
    },
    {
      "name": "Dr. Anjali Sharma",
      "degree": "BDS, MDS - Oral Surgery"
    },
    {
      "name": "Dr. Rajeev Kumar",
      "degree": "MBBS, MS - Orthopedics"
    },
    {
      "name": "Dr. Meena Iyer",
      "degree": "MBBS, DGO - Gynecology"
    },
    {
      "name": "Dr. Amit Verma",
      "degree": "MBBS, DM - Cardiology"
    }
  ]
}

const user = {
  name : "Pragati Shrivastava",
  role : "nurse",
  email : "priya.sharma@example.com",
  phoneNumber : "9876543210",
  addr : "Health Campus, Bengaluru",
  username : "meriPragatinahihorhi",
  gender : "Female",
  shift : "Morning",
  test : [
    {tname: "ECG", room: "T-129"},
    {tname: "MRI SCAN", room: "T-149"},
    {tname: "Blood Test", room: "T-139"},
  ],
}



function SideBarComponent(){
  return (
    <div className={classes.sideBarWrapper}>
      <div className={classes.imageDiv}>
        <img src = {ImagePlaceHolder} alt="Profile Images"/>
      </div>

      <div className = { classes.mainSection }>

        <div className ={classes.aboutName}>
          {(user.role==="doctor"? "Dr. ":"")}{user.name}
        </div>

        <div className={`${classes.roleButton} ${user.role==="doctor" ? classes.cDoctor : 
                                                 user.role==="nurse"  ? classes.cNurse : 
                                                 user.role==="DEO" ? classes.cDEO : classes.cFDO }`}>
          {user.role.toUpperCase()}
        </div>

        <div className = {classes.section}>
          <span>Username : </span> {user.username}<br/>
          <span>Gender : </span> {user.gender}
        </div>

        <div className={classes.section}>
          <span>E-mail : </span> {user.email} <br/>
          <span>Phone no. : </span> {user.phoneNumber} <br/>
          <span>Address : </span> {user.addr} <br/>
        </div>     

      </div>

      <div className={classes.movingSection}>
        {user.role==="doctor" ? <DoctorSideBarComponent/> : 
        user.role==="nurse" ? <NurseSideBarComponent/> : 
        <HospitalStaffSideBarComponent/>}
      </div>
      
    </div>
  );
}

function DoctorSideBarComponent(){
  const [selectedPage, setSelectedPage] = useState(1);
  
  const handleSelectedPageOne = () => setSelectedPage(1);
  const handleSelectedPageTwo = () => setSelectedPage(2);
  const handleSelectedPageThree = () => setSelectedPage(3);

  return (
    <div className ={classes.sideMainWrapper}>
      <div className={classes.sideNavBarContainer}>
          <button 
              className={(selectedPage===1)?classes.activeBtn:""}
              onClick={handleSelectedPageOne}
          > 
              <FontAwesomeIcon icon={faAddressCard}/>
          </button> 

          <span className={classes.sideVerticalBar}/>

          <button
              className={(selectedPage===2)?classes.activeBtn:""}
              onClick={handleSelectedPageTwo}
          > 
              <FontAwesomeIcon icon={faFlaskVial}/> 
          </button> 

          <span className={classes.sideVerticalBar}/>

          <button
              className={(selectedPage===3)?classes.activeBtn:""}
              onClick={handleSelectedPageThree}
          > 
              <FontAwesomeIcon icon={faSuitcaseMedical}/> 
          </button> 
      </div>

      <div className={classes.sideMainContent}>
          <div className={`${classes.sideContentWrapper} ${selectedPage===1 ? classes.one : selectedPage===2 ? classes.two : classes.three}`}>
              <div className={`${classes.sideContentPage} ${classes.firstPage}`}>
                
                <div className={classes.section}>
                  <h3>INFO</h3>
                  <span>Specialisation : </span> {user.spec} <br/>
                  <span>Qualification : </span> {user.qualification} <br/>
                  <span>Room : </span> {user.room} <br/>
                </div>

                <div className={classes.section}>
                  <h3>TIMINGS</h3>
                  <span>IN TIME : </span> {user.inTime} <br/>
                  <span>OUT TIME : </span> {user.outTime} <br/>
                  <span>DOJ : </span> {new Date(user.DOJ).toLocaleDateString('en-GB')} <br/>
                </div>

              </div>

              <div className={`${classes.sideContentPage} ${classes.secondPage}`}>
                <h3>TESTS SUPERVISION</h3>
                <hr/>
                <div className={classes.profileCardTest}>
                  {user.test.map((test,index)=>(
                    <div>
                      <span>{test.tname}</span>    {/* change it to name if required */}
                      <p>{test.room}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${classes.sideContentPage} ${classes.thirdPage}`}>
                <h3>PROFESSIONALS</h3>
                <hr/>
                <div className={classes.profileCardHp}>
                  {user.hp.map((person,index)=>(
                    <div>
                      <span>{person.name}</span>
                      <p>{person.degree}</p>
                    </div>
                  ))}
                </div>
              </div>
          </div>      
      </div>
    </div>
  );
}

function NurseSideBarComponent(){
  const [selectedPage, setSelectedPage] = useState(1);
  
  const handleSelectedPageOne = () => setSelectedPage(1);
  const handleSelectedPageTwo = () => setSelectedPage(2);

  return (
    <div className ={classes.sideMainWrapper}>
      <div className={classes.sideNavBarContainer}>
          <button 
              className={(selectedPage===1)?classes.activeBtn:""}
              onClick={handleSelectedPageOne}
          > 
              <FontAwesomeIcon icon={faAddressCard}/>
          </button> 

          <span className={classes.sideVerticalBar}/>

          <button
              className={(selectedPage===2)?classes.activeBtn:""}
              onClick={handleSelectedPageTwo}
          > 
              <FontAwesomeIcon icon={faFlaskVial}/> 
          </button>
      </div>

      <div className={classes.sideMainContent}>
          <div className={`${classes.sideContentWrapper} ${selectedPage===1 ? classes.one : selectedPage===2 ? classes.two : classes.three}`}>
              <div className={`${classes.sideContentPage} ${classes.firstPage}`}>
                <div className={classes.section}>
                  <span>SHIFT : </span> {user.shift} <br/>
                </div>
              </div>
              <div className={`${classes.sideContentPage} ${classes.secondPage}`}>
                <h3>TESTS SUPERVISION</h3>
                <hr/>
                <div className={classes.profileCardTest}>
                  {user.test.map((test,index)=>(
                    <div>
                      <span>{test.tname}</span>    {/* change it to name if required */}
                      <p>{test.room}</p>
                    </div>
                  ))}
                </div>
              </div>
          </div>      
      </div>
    </div>
  );
}

function HospitalStaffSideBarComponent(){
  const [selectedPage, setSelectedPage] = useState(1);
  
  const handleSelectedPageOne = () => setSelectedPage(1);

  return (
    <div className ={classes.sideMainWrapper}>
      <div className={classes.sideNavBarContainer}>
          <button 
              className={(selectedPage===1)?classes.activeBtn:""}
              onClick={handleSelectedPageOne}
          > 
              <FontAwesomeIcon icon={faAddressCard}/>
          </button>
      </div>

      <div className={classes.sideMainContent}>
          <div className={`${classes.sideContentWrapper} ${selectedPage===1 ? classes.one : selectedPage===2 ? classes.two : classes.three}`}>
              <div className={`${classes.sideContentPage} ${classes.firstPage}`}>
                  
              </div>
          </div>      
      </div>
    </div>
  );
}