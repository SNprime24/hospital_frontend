import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan, faPen } from "@fortawesome/free-solid-svg-icons";

import ProfileImagePlaceholder from "./../assets/ProfileImagePlaceholderGrey.jpg"

import classes from "./SubRootLayout.module.css";
import { useSelector } from "react-redux";
import PatientMedicalDetails from "./PatientMedicalDetails";
import { useLazyGetThisAppointmentQuery } from "../redux/api/api";


// const user = {
//     role: "FDO",
// }

// const appointment = {
//     time: "2025-04-09T10:30:00.000Z",
//     dischargeTime: "2025-04-09T14:00:00.000Z",
//     status: "InProgress",
//     active: true,
//     name: "Suprit naik",
//     patient: "661537a0c3b1f4b6a8d0ef01",
//     doctor: {
//       _id: "661538a1f2c4a7b6a9d2aa02",
//       name: "Ayesha Rahman",
//       spec: "Cardiology",
//       phoneNumber: "+92-300-1234567",
//       room: "305B",
//       role: "Doctor",
//     },
//     room: {
//       name: "R-123",
//     },
//     bed: {
//       name: "B-123",
//     },
//     nurse: [
//       {
//         _id: "661539b3a5e2a2b6b3f1aa03",
//         name: "Priya Sharma",
//         shift: "Morning",
//         phoneNumber: "+91-98101-12345",
//         role: "Nurse",
//       },
//       {
//         _id: "661539b3a5e2a2b6b3f1aa04",
//         name: "Rajesh Verma",
//         shift: "Evening",
//         phoneNumber: "+91-98202-23456",
//       },
//       {
//         _id: "661539b3a5e2a2b6b3f1aa05",
//         name: "Anjali Mehra",
//         shift: "Night",
//         phoneNumber: "+91-98303-34567",
//       },
//     ],
//     remarks: [
//       {
//         remarkTime: "2025-04-09T11:00:00.000Z",
//         remarkMsg: "Patient showing stable vitals.",
//       },
//       {
//         remarkTime: "2025-04-09T12:30:00.000Z",
//         remarkMsg: "Medication administered.",
//       },
//     ],
//     tests: ["66153a7e8db5e1b6c2d4ab04", "66153b89e3a7f9b6e3f5bc05"],
//     hps: [
//       {
//         _id: "66153ca4b2c7f0b6e6a7cd06",
//         name: "Kiran Joshi",
//         phoneNumber: "+91-98765-43210",
//       },
//       {
//         _id: "66153ca4b2c7f0b6e6a7cd07",
//         name: "Arvind Nair",
//         phoneNumber: "+91-98987-12345",
//       },
//     ],
//     hs: ["66153dbab6f8e2b6e9b8de07"],
//     disease: [
//       {
//         _id: "66153ec2f8a3a9b6f0c9ef08",
//         diseaseName: "Hypertension",
//       },
//       {
//         _id: "66153ec2f8a3a9b6f0c9ef09",
//         diseaseName: "Type 2 Diabetes",
//       },
//     ],
//     assignedRoom: {
//       _id: "66153fd9a4d1a1b6f2d0f009",
//       name: "Room 305B - Cardio Ward",
//     },
//     drugs: [
//       {
//         drug: "661540e7d5e1a2b6f4e1f10a",
//         dosage: "500mg twice a day",
//       },
//       {
//         drug: "661541f6f9a4b3b6f6f2f20b",
//         dosage: "250mg before bedtime",
//       },
//     ],
// };


export default function SubRootLayout() {
    const { user } = useSelector((state) => state.auth);

    const location = useLocation();
    const navigate = useNavigate();
    const currentPatient = location.state.patient;
    const [getAppointment, { data, isSuccess }] = useLazyGetThisAppointmentQuery();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [id, setId] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState();

    useEffect(() => {
        if (id) {
            getAppointment(id);
        }
    }, [id, getAppointment]);
    
    useEffect(() => {
        if (data && isSuccess) {
            setAppointmentDetails(data.appointment);
        }
    }, [data, isSuccess]);    

    const patient = {
        ...currentPatient,
        currentAppointments: currentPatient?.appointments?.filter(app =>
            app.status === "Scheduled" || app.status === "InProgress"
        ),
        pastAppointments: currentPatient?.appointments?.filter(app =>
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
                    <div className={classes.guardian} title={patient.gPhoneNumber}>
                        {patient.gname} <span>{patient.gPhoneNumber}</span>
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
                    <PatientMedicalDetails appointment = {appointmentDetails} />
                }
            </main>

            <aside className={`${classes.sidebar} ${sidebarOpen ? classes.open : classes.close}`}>
             {/*   <h3>CURRENT</h3>
                {
                    (Object.keys(patient?.currentAppointments).length === 0 && user?.role === 'FDO') &&
                    <>
                        <button className={classes.newAppointmentButton} >NEW APPOINTMENT</button>
                    </>
                }
                {(patient?.currentAppointments && Object.keys(patient?.currentAppointments).length) !== 0 ? (
                    <>
                        <button onClick = {() => setId(patient.currentAppointments[0]._id)}>
                            {
                                (() => {
                                    const date = new Date(patient.currentAppointments[0]?.time);

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
                            <button onClick = {() => setId(appointment._id)}>
                                {`${datePart} ${timePart}`}
                            </button>
                            <hr />
                        </>
                    );
                })}  */}
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