import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus, faClockRotateLeft, faNotesMedical, faSearch } from "@fortawesome/free-solid-svg-icons";

import { BoxBarComponent } from '../components/DoctorNurseComponents/BoxBarComponent';
import { StrechBarComponent } from '../components/DoctorNurseComponents/StrechBarComponent';

import classes from "./DoctorMainPage.module.css";

import { useErrors } from '../hooks/hooks'
import { useGetAppointmentsQuery, useGetCurrentAppointmentsQuery } from '../redux/api/api';
import { useNavigate } from 'react-router-dom';


function DoctorMainPage() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [selectedPage, setSelectedPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    const handleSelectedPageOne = () => setSelectedPage(1);
    const handleSelectedPageTwo = () => setSelectedPage(2);
    const handleSelectedPageThree = () => setSelectedPage(3);


    const appointmentData = useGetAppointmentsQuery({ _id: user._id });
    const currentAppointmentsData =  useGetCurrentAppointmentsQuery({ entity: "doctor", _id: user._id })
    const errors = [
        { isError: appointmentData.isError, error: appointmentData.error },
        { isError: currentAppointmentsData.isError, error: currentAppointmentsData.error }
    ]
    useErrors(errors);

    const appointments = appointmentData?.data?.appointments?.filter(item =>
        item?.patient?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    const currentAppointments = currentAppointmentsData?.data?.appointments?.filter(item =>
        item?.patient?.name?.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className={classes.mainWrapper}>
            <div className={classes.navBarContainer}>
                <button
                    className={(selectedPage === 1) ? classes.activeBtn : ""}
                    onClick={handleSelectedPageOne}
                >
                    <FontAwesomeIcon icon={faCalendarPlus} />
                    <span>APPOINTMENT</span>
                </button>

                <span className={classes.verticalBar} />

                <button
                    className={(selectedPage === 2) ? classes.activeBtn : ""}
                    onClick={handleSelectedPageTwo}
                >
                    <FontAwesomeIcon icon={faNotesMedical} />
                    <span>CURRENT</span>
                </button>

                <span className={classes.verticalBar} />

                <button
                    className={(selectedPage === 3) ? classes.activeBtn : ""}
                    onClick={handleSelectedPageThree}
                >
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    <span>PAST</span>
                </button>
            </div>

            <div className={classes.searchInputDiv}>
                <input
                    type="text"
                    name="text"
                    value={searchText}
                    className={classes.searchInput}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Tab") {
                            event.preventDefault();
                        }
                    }}
                    placeholder="Filter by name..."
                />
                <FontAwesomeIcon icon={faSearch} />
            </div>

            <div className={classes.mainContent}>

                <div className={`${classes.contentWrapper} ${selectedPage === 1 ? classes.one : selectedPage === 2 ? classes.two : classes.three}`}>
                    <div className={`${classes.contentPage} ${classes.firstPage}`}>   
                        {(!appointments || appointments?.filter(appointment => appointment?.status === "Scheduled").length === 0) && 
                            <p className={classes.unavailableData}>-- No Scheduled Appointments due --</p>
                        }     

                        {appointments && appointments
                            ?.filter(appointment => appointment?.status === "Scheduled")
                            ?.map((appointment) => (
                                <StrechBarComponent 
                                    key={appointment._id} 
                                    discharged={false} 
                                    appointment={appointment}
                                    handleClick={() => {
                                        navigate(`patient/${appointment.patient._id}`, {
                                            state: { 
                                                appointmentID: appointment._id,
                                                patientID: appointment.patient._id
                                            }
                                        });
                                    }}
                                />
                            ))
                        }
                    </div>
                    <div className={`${classes.contentPage} ${classes.secondPage}`}>
                        {(!currentAppointments || currentAppointments.length === 0) && 
                            <p className={classes.unavailableData}>-- No Current Appointments due --</p>
                        }   

                        {currentAppointments && currentAppointments
                            ?.map((appointment) => (
                                <BoxBarComponent 
                                    key={appointment._id} 
                                    appointment={appointment}
                                    handleClick={() => {
                                        navigate(`patient/${appointment.patient._id}`, {
                                            state: { 
                                                appointmentID: appointment._id,
                                                patientID: appointment.patient._id
                                            }
                                        });
                                    }}
                                />
                            ))
                        }
                    </div>
                    <div className={`${classes.contentPage} ${classes.thirdPage}`}>
                        {(!appointments || appointments?.filter(appointment => appointment?.status === "Completed").length === 0) && 
                            <p className={classes.unavailableData}>-- Patient Archive is Empty !! --</p>
                        } 
                        {appointments && appointments
                            ?.filter(appointment => appointment?.status === "Completed")
                            ?.map((appointment) => (
                                <StrechBarComponent 
                                    key={appointment._id} 
                                    discharged={true} 
                                    appointment={appointment} 
                                    handleClick={() => {
                                        navigate(`patient/${appointment.patient._id}`, {
                                            state: { 
                                                appointmentID: appointment._id,
                                                patientID: appointment.patient._id
                                            }
                                        });
                                    }}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DoctorMainPage