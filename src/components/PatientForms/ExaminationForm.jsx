import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenClip, faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

import { FormSelect } from "../DEOComponents/FormInput";
import { ModalComponent } from "../ModalComponent";
import { StrechBarComponent } from "../DoctorNurseComponents/StrechBarComponent";

import classes from "./AppointForm.module.css";
import examClasses from "./ExaminationForm.module.css";
import { useGetAllDiseasesQuery, useGetAllHPsQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hooks";


function ExaminationForm({ type = "new", formData, setFormData, handleSubmit }) {
    const [modalState, setModalState] = useState(0);
    const [searchName, setSearchName] = useState(""); 

    const handleCloseModal = () => {
        setSearchName("");
        setModalState(0);
    }

    const hpsData = useGetAllHPsQuery();
    const diseasesData = useGetAllDiseasesQuery();
    const errors = [
        { isError: hpsData.isError, error: hpsData.error },
        { isError: diseasesData.isError, error: diseasesData.error },
    ];
    useErrors(errors);
    const fetchHP = hpsData?.data?.data;
    const fetchDiseases = diseasesData?.data?.data || [];
    const diseaseOptions = fetchDiseases?.map((disease, index) => ({ value: disease._id, label: disease.name }));

    const handleSelectDiseases = (e) => {
        const selected = e.target.value;
        if (!selected) return;

        setFormData(prev => {
          if (prev.disease.includes(selected)) return prev;
          return { ...prev, disease: [...prev.disease, fetchDiseases.find((disease)=>disease._id===selected)] };
        });
    };   

    return (
        <div className={classes.wrapper}>
            <h5>DISEASES : </h5>
            <div className={examClasses.tagContainer}>
                {formData?.disease?.map((disease, index) => (
                    <div key={index} className={examClasses.diseaseTag}>
                        {disease.name}
                        <button
                            className={examClasses.removeTagBtn}
                            onClick={() => {
                                setFormData(prev => ({
                                    ...prev,
                                    disease: prev.disease.filter(d => d !== disease)
                                }));
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                ))}
            </div>
            <FormSelect
                label="Select Disease"
                name="diseases"
                onChange={handleSelectDiseases}
                options={diseaseOptions}
                defaultValue="Choose Disease"
            />

            <h5>ASSIGN HOSPITAL PROFESSIONALS : </h5>
            {formData?.hps?.length === 0 ?
                <button
                    className={classes.chooseInput}
                    onClick={() => setModalState(1)}
                >
                    <FontAwesomeIcon icon={faPlusCircle} />
                </button>
                :
                <>
                    {formData?.hps.map((val, _) => (
                        <div className={classes.divFlex} key={val?._id || _}>
                            <StrechBarComponent appointment={val} type={5} />
                            <button
                                className={`${classes.chooseInput} ${classes.edit}`}
                                onClick={() => setModalState(1)}
                            >
                                <FontAwesomeIcon icon={faPenClip} />
                            </button>
                            <button
                                className={`${classes.chooseInput} ${classes.edit} ${examClasses.cross}`}
                                onClick={() => {
                                    setFormData(prev => (
                                        { ...prev, hps: prev.hps.filter(hp => hp._id !== val._id) }
                                    ));
                                }}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                    ))}
                </>
            }

            <button className={classes.submitBtn} onClick={handleSubmit}>
                Submit
            </button>


            <ModalComponent
                modalState={modalState}
                onHandleClose={handleCloseModal}
            >
                <ChooseHPS
                    type={type === "new" ? "ADD" : "EDIT"}
                    searchName={searchName}
                    setSearchName={setSearchName}
                    formData={formData}
                    setFormData={setFormData}
                    fetchHP={fetchHP}
                />
            </ModalComponent>

        </div>
    );
}

export { ExaminationForm }

function ChooseHPS ({
    type = "ADD",
    searchName,
    setSearchName,
    formData,
    setFormData,
    fetchHP
}) {
    const handleSelectHP = (selectedHP) => {
        setFormData((prev) => {
            if (prev.hps.find(hp => hp._id === selectedHP._id)) return prev;
            return { ...prev, hps: [...prev.hps, selectedHP] };
        });
    }

    return (
        <div className={classes.chooseWrapper}>
            <h2>{type} PROFESSIONALS</h2>
            <div className={classes.searchInputDiv}>
                <input
                    type="text"
                    name="Hname"
                    value={searchName}
                    className={classes.searchInput}
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Tab") {
                            event.preventDefault();
                        }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Filter by Name..."
                />
            </div>
            <div className={examClasses.slidingList}>
                {fetchHP?.map((val, _) => (
                    <StrechBarComponent
                        appointment={val}
                        type={5}
                        isActive={formData?.hps?.find(hp => (hp._id === val._id) ? true : false)}
                        handleClick={() => handleSelectHP(val)}
                    />
                ))}
            </div>
        </div>
    )
}