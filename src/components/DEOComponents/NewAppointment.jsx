import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faUser, faSearch } from "@fortawesome/free-solid-svg-icons";

import { StrechBarComponent } from "../DoctorNurseComponents/StrechBarComponent";

import classes from "./NewAppointment.module.css";
import { useLazyGetPatientByNumberQuery } from "../../redux/api/api";
import toast from "react-hot-toast";


function NewAppointment({ searchNumber, setSearchNumber, existingPatient, setExistingPatient }) {
    const navigate = useNavigate();
    const [getPatient, { isSuccess }] = useLazyGetPatientByNumberQuery();
    const [selectedPage, setSelectedPage] = useState(1);

    const handleSelectedPageOne = () => { 
        setSelectedPage(1); 
        setSearchNumber("");
        setExistingPatient(null); 
    }
    const handleSelectedPageTwo = () => setSelectedPage(2);

    const handleSearchClickAction = async () => {
        const result = await getPatient(searchNumber);
        if(result?.data?.success) {
            setExistingPatient(result.data.patient);
        } 
        else {
            toast.error(result.error.data.message);
            setExistingPatient(null);
        }
        setSearchNumber("");
    }

    const handleNewPatientButton = () => {
        navigate('form/new/patients');
    }

    return (
        <div className={classes.appWrapper}>
            <div className={classes.appHeading}>
                NEW APPOINTMENT
            </div>
            <div className={classes.appContent}>
                <div className={classes.navBarContainer}>
                    <button
                        className={(selectedPage === 1) ? classes.activeBtn : ""}
                        onClick={(e) => {
                            e.stopPropagation()
                            handleSelectedPageOne()
                        }}
                    >
                        <FontAwesomeIcon icon={faFileCirclePlus} />
                        <span>NEW</span>
                    </button>
                    <span className={classes.verticalBar} />
                    <button
                        className={(selectedPage === 2) ? classes.activeBtn : ""}
                        onClick={(e) => {
                            e.stopPropagation()
                            handleSelectedPageTwo()
                        }}
                    >
                        <FontAwesomeIcon icon={faUser} />
                        <span>EXISTING</span>
                    </button>
                </div>
                <div className={classes.mainContent}>
                    <div className={`${classes.contentWrapper} ${selectedPage === 1 ? classes.one : classes.two}`}>
                        <div className={`${classes.contentPage} ${classes.firstPage}`}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNewPatientButton();
                                }}
                            >
                                NEW PATIENT
                            </button>
                        </div>
                        <div className={`${classes.contentPage} ${classes.secondPage}`}>

                            <div className={classes.searchInputDiv}>
                                <input
                                    type="text"
                                    name="text"
                                    value={searchNumber}
                                    className={classes.searchInput}
                                    onChange={(e) => setSearchNumber(e.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === "Tab") {
                                            event.preventDefault();
                                        }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    placeholder="Filter by Phone Number..."
                                />
                                <FontAwesomeIcon 
                                    icon={faSearch}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleSearchClickAction()
                                    }}
                                />
                            </div>                           
                            {isSuccess && existingPatient && (<StrechBarComponent
                                discharged={false}
                                appointment={existingPatient}
                                type={0}
                                handleClick={() => {
                                    navigate(`patient/${existingPatient._id}`, {
                                        state: { patient: existingPatient }
                                    })
                                }}
                            />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { NewAppointment };