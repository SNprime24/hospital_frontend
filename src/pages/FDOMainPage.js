import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faUserDoctor, faUserNurse, faSearch } from "@fortawesome/free-solid-svg-icons";

import { ModalComponent } from '../components/ModalComponent';
import { NewAppointment } from '../components/DEOComponents/NewAppointment';
import { SmallBoxBarComponent } from '../components/DoctorNurseComponents/SmallBoxBarComponent';
import { StrechBarComponent } from '../components/DoctorNurseComponents/StrechBarComponent';

import classes from "./FDOMainPage.module.css";
import { useGetAllCurrentDoctorsQuery, useGetAllCurrentNursesQuery, useGetAllCurrentAppointmentsQuery } from '../redux/api/api';
import { useErrors } from '../hooks/hooks';
import { useNavigate } from 'react-router-dom';


function FDOMainPage() {
    const navigate = useNavigate();
    const [searchNumber, setSearchNumber] = useState("");
    const [selectedPage, setSelectedPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [existingPatient, setExistingPatient] = useState();

    const [modalState, setModalState] = useState(0);

    const handleSelectedPageOne = () => setSelectedPage(1);
    const handleSelectedPageTwo = () => setSelectedPage(2);
    const handleSelectedPageThree = () => setSelectedPage(3);

    const currentDoctorsData = useGetAllCurrentDoctorsQuery();
    const currentNursesData = useGetAllCurrentNursesQuery();
    const currentAppointmentsData = useGetAllCurrentAppointmentsQuery();
    const errors = [
        { isError: currentDoctorsData.isError, error: currentDoctorsData.error },
        { isError: currentNursesData.isError, error: currentNursesData.error },
        { isError: currentAppointmentsData.isError, error: currentAppointmentsData.error },
    ]
    useErrors(errors);

    const doctors = currentDoctorsData?.data?.data?.filter(item =>
        item?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    const nurses = currentNursesData?.data?.data?.filter(item =>
        item?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    const appointments = currentAppointmentsData?.data?.appointments?.filter(item =>
        item?.patient?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    // console.log(doctors);
    // console.log(nurses);
    // console.log(currentAppointmentsData);

    return (
        <div className={classes.mainWrapper}>
            <div className={classes.navBarContainer}>
                <button
                    className={(selectedPage === 1) ? classes.activeBtn : ""}
                    onClick={handleSelectedPageOne}
                >
                    <FontAwesomeIcon icon={faFilePen} />
                    <span>APPOINTMENT</span>
                </button>

                <span className={classes.verticalBar} />

                <button
                    className={(selectedPage === 2) ? classes.activeBtn : ""}
                    onClick={handleSelectedPageTwo}
                >
                    <FontAwesomeIcon icon={faUserDoctor} />
                    <span>DOCTOR</span>
                </button>

                <span className={classes.verticalBar} />

                <button
                    className={(selectedPage === 3) ? classes.activeBtn : ""}
                    onClick={handleSelectedPageThree}
                >
                    <FontAwesomeIcon icon={faUserNurse} />
                    <span>NURSE</span>
                </button>
            </div>

            <div className={classes.dataSubHeader}>
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
                <button
                    className={classes.addNewData}
                    onClick={() => setModalState(1)}
                >NEW</button>
            </div>

            <div className={classes.mainContent}>
                <div className={`${classes.contentWrapper} ${selectedPage === 1 ? classes.one : selectedPage === 2 ? classes.two : classes.three}`}>
                    <div className={`${classes.contentPage} ${classes.firstPage}`}>
                        {appointments && appointments
                            ?.map((appointment) => (
                                <StrechBarComponent 
                                    key={uuidv4()} 
                                    discharged={false} 
                                    appointment={appointment} 
                                    type={2} 
                                    handleClick={() => {
                                        navigate(`patient/${appointment.patient._id}`, {
                                            state: { 
                                                appointmentID: appointment._id,
                                                patient: appointment.patient
                                            }
                                        });
                                    }}
                                />
                            ))
                        }
                    </div>
                    <div className={`${classes.contentPage} ${classes.secondPage}`}>
                        {doctors && doctors
                            ?.map((doctor) => (
                                <SmallBoxBarComponent key={uuidv4()} user={doctor} />
                            ))
                        }
                    </div>
                    <div className={`${classes.contentPage} ${classes.thirdPage}`}>
                        {nurses && nurses
                            ?.map((nurse) => (
                                <SmallBoxBarComponent key={uuidv4()} user={nurse} />
                            ))
                        }
                    </div>
                </div>
            </div> 

            <ModalComponent
                modalState={modalState}
                onHandleClose={() => {
                    setExistingPatient(null);
                    setModalState(0);
                }}
            >
                <NewAppointment 
                    searchNumber={searchNumber}
                    setSearchNumber={setSearchNumber}
                    existingPatient={existingPatient} 
                    setExistingPatient={setExistingPatient}
                />
            </ModalComponent>

        </div>
    )
}

export default FDOMainPage;