import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenClip, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { FormInput } from "../DEOComponents/FormInput";
import { ModalComponent } from "../ModalComponent";
import { SmallBoxBarComponent } from "../DoctorNurseComponents/SmallBoxBarComponent";
import { StrechBarComponent } from "../DoctorNurseComponents/StrechBarComponent";

import { useGetAllDoctorsQuery } from "../../redux/api/api";
import { useErrors } from '../../hooks/hooks'

import classes from "./AppointForm.module.css";


function AppointForm({ type = "new", formData, setFormData, handleSubmit }) {
    const [searchTime, setSearchTime] = useState("");       
    const [searchSpec, setSearchSpec] = useState("");          
    const [modalState, setModalState] = useState(0);

    const handleFormChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleCloseModal = () => {
        setSearchTime("");
        setSearchSpec("");
        setModalState(0);
    }

    const doctorsData = useGetAllDoctorsQuery();
    const errors = [{ isError: doctorsData.isError, error: doctorsData.error }]
    useErrors(errors);
    let doctors = doctorsData?.data?.data;
    if(searchTime) doctors = doctors?.filter(item =>
        searchTime >= item?.inTime && searchTime <= item?.outTime
    );
    doctors = doctors?.filter(item =>
        item?.spec?.toLowerCase().includes(searchSpec.toLowerCase())
    );

    return (
        <div className={classes.wrapper }>
            {type === "new" &&
                <div className={classes.divFlex}>
                    <FormInput
                        type="date"
                        id="Adate"
                        name="date"
                        label="Appointment Date"
                        value={formData.date}
                        onChange={handleFormChange}
                    />
                    <FormInput
                        type="time"
                        id="Adate"
                        name="time"
                        label="Appointment Time"
                        value={formData.time}
                        onChange={handleFormChange}
                    />
                </div>
            }
            <h5>ASSIGN DOCTOR : </h5>
            {formData.doctor === null ?
                <button
                    className={classes.chooseInput}
                    onClick={() => setModalState(1)}
                >
                    <FontAwesomeIcon icon={faPlusCircle} />
                </button> :
                <div className={classes.divFlex}>
                    <StrechBarComponent appointment={formData?.doctor} type={3} />
                    <button
                        className={`${classes.chooseInput} ${classes.edit}`}
                        onClick={() => setModalState(1)}
                    >
                        <FontAwesomeIcon icon={faPenClip} />
                    </button>
                </div>
            }

            <button className={classes.submitBtn} onClick={handleSubmit}>
                Submit
            </button>

            <ModalComponent
                modalState={modalState}
                onHandleClose={handleCloseModal}
            >
                <ChooseDoctor
                    type={type === "new" ? "ADD" : "EDIT"}
                    searchTime={searchTime}
                    searchSpec={searchSpec}
                    setSearchTime={setSearchTime}
                    setSearchSpec={setSearchSpec}
                    formData={formData}
                    setFormData={setFormData}
                    doctors={doctors}
                />
            </ModalComponent>
        </div>
    );
}

export { AppointForm }

function ChooseDoctor ({
    type = "ADD",
    searchTime,
    searchSpec,
    setSearchTime,
    setSearchSpec,
    formData,
    setFormData,
    doctors
}) {
    return (
        <div className={classes.chooseWrapper}>
            <h2>{type} A DOCTOR</h2>
            <div className={classes.searchInputDiv}>
                <input
                    type="time"
                    name="Time"
                    value={searchTime}
                    className={classes.searchInput}
                    onChange={(e) => setSearchTime(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Tab") {
                            event.preventDefault();
                        }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Filter by Time..."
                />
            </div>
            <div className={classes.searchInputDiv}>
                <input
                    type="text"
                    name="Spec"
                    value={searchSpec}
                    className={classes.searchInput}
                    onChange={(e) => setSearchSpec(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Tab") {
                            event.preventDefault();
                        }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Filter by Specialisation..."
                />
            </div>
            <div className={classes.slidingList}>
                {doctors?.map((val, _) => (
                    <SmallBoxBarComponent user={val}
                        handleClick={() => setFormData((prev) => ({ ...prev, "doctor": val }))}
                        isActive={val?._id === formData?.doctor?._id}
                    />
                ))}
            </div>

        </div>
    )
}