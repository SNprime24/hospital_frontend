import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan, faPen } from "@fortawesome/free-solid-svg-icons";

import ProfileImagePlaceholder from "./../assets/ProfileImagePlaceholderGrey.jpg"

import classes from "./SubRootLayout.module.css";


const user = {
    role : "FDO",
}

const patient = {
    "name": "Riya Sharma",
    "age": 24,
    "addr": "Sector 10, Noida",
    "phoneNumber": "9876543210",
    "email": "riya.sharma@example.com",
    "userName": "riya_sharma",
    "password": "********",
    "gender": "Female",
    "guardian_name": "Rajesh Sharma",
    "guardian_phoneNo": "9811122233",
    "active": true,
    "currentAppointments" : {},
    "pastAppointments": [
        {
            "time": "2025-04-08T09:00:00.000Z",
            "dischargeTime": "2025-04-08T17:00:00.000Z"
        },
        {
            "time": "2025-03-25T14:30:00.000Z",
            "dischargeTime": "2025-03-26T10:00:00.000Z"
        },
        {
            "time": "2025-01-15T08:15:00.000Z",
            "dischargeTime": "2025-01-15T20:45:00.000Z"
        },
        {
            "time": "2024-12-01T11:00:00.000Z",
            "dischargeTime": "2024-12-03T13:30:00.000Z"
        },
        {
            "time": "2025-04-09T06:45:00.000Z",
            "dischargeTime": "2025-04-09T12:00:00.000Z"
        }
    ]
}


export default function SubRootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={classes.rootLayout}>
        <div className={classes.generalInfo}>
            <div className={classes.imgSection}>
                <img src={ProfileImagePlaceholder} alt="profile"/>
            </div>
            <div className={classes.info}>
                <div className={classes.name}>
                    {patient.name} 
                    <button className={classes.smallButton} title="Edit Profile"> 
                        <FontAwesomeIcon icon ={faPen}/> 
                    </button>
                </div>
                <hr/>
                <div className={classes.genderAge}>
                    {patient.gender} <div>{patient.age}</div>
                </div>
                <hr/>
                <div className={classes.contact}>
                    {patient.phoneNumber} <span>{patient.email}</span>
                </div>
                <hr/>
                <div className={classes.address}>
                    {patient.addr} <span>{patient.userName}</span>
                </div>
                <hr/>
                <div className={classes.guardian} title={patient.guardian_phoneNo}>
                    {patient.guardian_name} <span>{patient.guardian_phoneNo}</span>
                </div>
                <hr/>
            </div>            
        </div>
        

        <main className={classes.mainContent}>
            <div className={classes.sidebarCloseButton}>
                <button className={classes.smallButton} title="Edit Profile" onClick={() => setSidebarOpen(prev => !prev)}> 
                    {sidebarOpen?<FontAwesomeIcon icon ={faLessThan}/>: "<"}
                </button>
            </div>
            <Outlet />
        </main>

        <aside className={`${classes.sidebar} ${sidebarOpen ? classes.open : classes.close}`}>
            <h3>CURRENT</h3>
            {  
                (Object.keys(patient?.currentAppointments).length === 0 && user.role==='FDO') &&
                <>
                    <button className={classes.newAppointmentButton} >NEW APPOINTMENT</button> 
                </>
            }
            {(patient?.currentAppointments && Object.keys(patient.currentAppointments).length) !== 0 ? (
                <>
                    <button>
                        {
                        (() => {
                            const date = new Date(patient.currentAppointments.time);

                            const datePart = date.toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric'
                            });

                            const timePart = date.toLocaleTimeString(undefined, {
                            hour: '2-digit',
                            minute: '2-digit'
                            });

                            return `${datePart} ${timePart}`;
                        })()
                        }
                    </button>
                </>
            ):
            <div> --CURRENTLY UNAVAILABLE--</div>
            }

            <hr style={{height : '3px',background : '#1d7ee4'}}/>

            <h3>PAST</h3>
            {patient?.pastAppointments?.map((appointment,_)=>{
                const date = new Date(appointment?.time);

                const datePart = date.toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric'
                });

                const timePart = date.toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                return(
                    <>
                        <button>
                            {`${datePart} ${timePart}`}
                        </button>
                        <hr/>
                    </>
                );
            })}
            <div className={classes.sidebarCloseButton} style={{right : '10px'}}>
                <button 
                    className={classes.smallButton} 
                    title="Edit Profile" 
                    onClick={(e) => {
                        e.stopPropagation();
                        setSidebarOpen(prev => !prev)
                    }}
                > 
                    {"X"}
                </button>
            </div>
        </aside>

    </div>
  );
}