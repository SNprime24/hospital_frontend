import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan, faPen } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';

import ProfileImagePlaceholder from "./../assets/ProfileImagePlaceholderGrey.jpg"

import classes from "./SubRootLayout.module.css";
import { useSelector } from "react-redux";
import PatientMedicalDetails from "./PatientMedicalDetails";
import { useDischargeAppointmentMutation, useLazyGetThisAppointmentQuery, useLazyGetThisPatientQuery } from "../redux/api/api";
import { useAsyncMutation } from "../hooks/hooks";


export default function SubRootLayout() {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location.state);
    const [getAppointment, { data, isSuccess }] = useLazyGetThisAppointmentQuery();
    const [getPatientById, { data: patientData, isSuccess: isPatientSuccess }] = useLazyGetThisPatientQuery();
    const [dischargeAppointment] = useAsyncMutation(useDischargeAppointmentMutation);
    
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [newAppoint, setNewAppoint] = useState(false);
    const [id, setId] = useState(null);
    const [patientID, setPatientID] = useState(null);
    const [currentPatient, setCurrentPatient] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState();
    console.log(id);
    console.log(data);

    useEffect(() => {
        if (location?.state?.appointmentID) {
            setId(location.state.appointmentID);
        }
    }, [location?.state?.appointmentID]);

    useEffect(() => {
        if(location?.state?.patientID) {
            setPatientID(location.state.patientID);
        }
    }, [location?.state?.patientID])

    useEffect(() => {
        if(id) {
            getAppointment(id);
        }
    }, [id, getAppointment]);

    useEffect(() => {
        console.log(patientID);
        if(patientID) {
            getPatientById(patientID);
        }
    }, [patientID, getPatientById]);
    
    useEffect(() => {
        if(data && isSuccess) {
            setAppointmentDetails(data.appointment);
        }
    }, [data, isSuccess]);    

    useEffect(() => {
        if(patientData && isPatientSuccess) {
            setCurrentPatient(patientData.patient);
        }
    }, [patientData, isPatientSuccess]);  

    console.log(data?.appointment);

    const patient = {
        ...currentPatient,
        currentAppointments: currentPatient?.appointments?.filter(app =>
            app.status === "Scheduled" || app.status === "InProgress"
        ),
        pastAppointments: currentPatient?.appointments?.filter(app =>
            app.status === "Completed" || app.status === "Cancelled"
        ) ?? []
    }

    const handleDischarge = () => {
        const formData = { id: id, dischargeTime: Date.now, status: "Completed" }
        dischargeAppointment("Dischraging appointment...", formData);
        navigate('/');
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
                        <button 
                            className={classes.smallButton} 
                            title="Edit Profile" 
                            onClick={() => {
                                navigate('/app/form/edit/patients', {
                                    state: { item: currentPatient }
                                });
                            }}
                        >
                            <FontAwesomeIcon icon={faPen} />
                        </button>
                    </div>
                    <hr />
                    <div className={classes.genderAge} title="Gender">
                        {patient?.gender} <div title="Age">{patient?.age}</div>
                    </div>
                    <hr />
                    <div className={classes.contact}>
                        {patient?.phoneNumber} <span>{patient?.email}</span>
                    </div>
                    <hr />
                    <div className={classes.address}>
                        {patient?.addr} <span>{patient?.userName}</span>
                    </div>
                    <hr />
                    <div className={classes.guardian} title={patient.gPhoneNo}>
                        {patient.gname} <span>{patient.gPhoneNo}</span>
                    </div>
                    <hr />
                </div>
            </div>


            <main className={classes.mainContent}>
                <div className={classes.sidebarCloseButton}>
                    <button className={classes.smallButton}  onClick={() => setSidebarOpen(prev => !prev)}>
                        {sidebarOpen ? <FontAwesomeIcon icon={faLessThan} /> : "<"}
                    </button>
                </div>

                {isSuccess && appointmentDetails && 
                    <PatientMedicalDetails 
                        appointment = {appointmentDetails} 
                        handleDischarge = {handleDischarge}
                    />
                }
                {newAppoint && <PatientMedicalDetails type="new" setNewAppoint={setNewAppoint} />}
            </main>

            <aside className={`${classes.sidebar} ${sidebarOpen ? classes.open : classes.close}`}>
               <h3>CURRENT</h3>
                {
                    (Array.isArray(patient?.currentAppointments) && patient.currentAppointments.length === 0 && user?.role === 'FDO')
                    &&
                    <>
                        <button 
                            className={classes.newAppointmentButton} 
                            onClick={() => {
                                setAppointmentDetails(null);
                                setNewAppoint(true)
                            }}
                        >
                            NEW APPOINTMENT
                        </button>
                    </>
                }
                {Array.isArray(patient?.currentAppointments) && patient?.currentAppointments?.length !== 0 ? (
                    <>
                        <button onClick = {() => {
                            setId(patient?.currentAppointments[0]?._id)
                            setNewAppoint(false)
                        }}>
                            {
                                (() => {
                                    const date = new Date(patient?.currentAppointments[0]?.time);

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
                    const key = uuidv4();

                    const datePart = date.toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric'
                    });

                    const timePart = date.toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    return (
                        <React.Fragment key = {key}>
                            <button onClick = {() => {
                                setId(appointment._id)
                                setNewAppoint(false)
                            }}>
                                {`${datePart} ${timePart}`}
                            </button>
                            <hr />
                        </React.Fragment>
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