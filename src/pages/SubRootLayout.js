import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import ProfileImagePlaceholder from "./../assets/ProfileImagePlaceholderGrey.jpg"

import classes from "./SubRootLayout.module.css";

import SideBarComponent from "../components/SideBarComponent";

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
    "appointments": []
}


export default function SubRootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={classes.rootLayout}>
        <div className={classes.generalInfo}>
            <div className={classes.imgSection}>
                <img src={ProfileImagePlaceholder} alt="profile image"/>
            </div>
            <div className={classes.info}>
                <div className={classes.name}>
                    {patient.name} <span>{patient.userName}</span>
                </div>
                <div className={classes.genderAge}>
                    {patient.gender} <div>{patient.age}</div>
                </div>
                <div className={classes.contact}>
                    {patient.phoneNumber} <span>{patient.email}</span>
                </div>
                <div className={classes.address}>
                    {patient.addr}
                </div>
                <div className={classes.guardian}>
                    {patient.guardian_name} <span>{patient.guardian_phoneNo}</span>
                </div>
            </div>
        </div>


        <main className={classes.mainContent}>
            <div className={classes.temp}></div>
            <Outlet />
        </main>

        <aside className={`${classes.sidebar} ${sidebarOpen ? classes.open : classes.close}`}>
            
        </aside>

    </div>
  );
}