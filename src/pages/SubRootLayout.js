import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan, faPen } from "@fortawesome/free-solid-svg-icons";

import ProfileImagePlaceholder from "./../assets/ProfileImagePlaceholderGrey.jpg"

import classes from "./SubRootLayout.module.css";
import { useSelector } from "react-redux";


const user = {
    role: "FDO",
}


export default function SubRootLayout() {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentPatient = location.state.patient;
    console.log(currentPatient);

    const patient = {
        ...currentPatient,
        currentAppointments: currentPatient.appointments?.filter(app =>
            app.status === "Scheduled" || app.status === "InProgress"
        ),
        pastAppointments: currentPatient.appointments?.filter(app =>
            app.status === "Completed" || app.status === "Cancelled"
        ) ?? []
    }

    return (
        <div className={classes.rootLayout}>
            <div className={classes.generalInfo}>
                <div className={classes.imgSection}>
                    <img src={ProfileImagePlaceholder} alt="profile" />
                </div>
                <div className={classes.info}>
                    <div className={classes.name}>
                        {patient.name}
                        <button className={classes.smallButton} title="Edit Profile">
                            <FontAwesomeIcon icon={faPen} />
                        </button>
                    </div>
                    <hr />
                    <div className={classes.genderAge} title="Gender">
                        {patient.gender} <div title="Age">{patient.age}</div>
                    </div>
                    <hr />
                    <div className={classes.contact}>
                        {patient.phoneNumber} <span>{patient.email}</span>
                    </div>
                    <hr />
                    <div className={classes.address}>
                        {patient.addr} <span>{patient.userName}</span>
                    </div>
                    <hr />
                    <div className={classes.guardian} title={patient.guardian_phoneNo}>
                        {patient.guardian_name} <span>{patient.guardian_phoneNo}</span>
                    </div>
                    <hr />
                </div>
            </div>


            <main className={classes.mainContent}>
                <div className={classes.sidebarCloseButton}>
                    <button className={classes.smallButton} title="Edit Profile" onClick={() => setSidebarOpen(prev => !prev)}>
                        {sidebarOpen ? <FontAwesomeIcon icon={faLessThan} /> : "<"}
                    </button>
                </div>
                <Outlet />
            </main>

            <aside className={`${classes.sidebar} ${sidebarOpen ? classes.open : classes.close}`}>
                <h3>CURRENT</h3>
                {
                    (Object.keys(patient?.currentAppointments).length === 0 && user.role === 'FDO') &&
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
                ) :
                    <div> --CURRENTLY UNAVAILABLE--</div>
                }

                <hr style={{ height: '3px', background: '#1d7ee4' }} />

                <h3>PAST</h3>
                {patient?.pastAppointments?.map((appointment, _) => {
                    const date = new Date(appointment?.time);

                    const datePart = date.toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric'
                    });

                    const timePart = date.toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    return (
                        <>
                            <button>
                                {`${datePart} ${timePart}`}
                            </button>
                            <hr />
                        </>
                    );
                })}
                <div className={classes.sidebarCloseButton} style={{ right: '10px' }}>
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