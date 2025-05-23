import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

import classes from "./DEOFormsDesign.module.css";

import { FormInput, FormSelect, FormSubmit } from './FormInput';

import { useAsyncMutation, useCreateMutation, useErrors } from '../../hooks/hooks';
import { useCreateHPMutation, useGetAllDoctorsQuery, useUpdateHPMutation } from '../../redux/api/api';


function HPForm({ type, item }) {
    const [formData, setFormData] = useState({
        firstName: (type === "edit") ? item.item?.name.split(' ')[0] : "",
        lastName: (type === "edit") ? item.item?.name.split(' ')[1] : "",
        address: (type === "edit") ? item.item?.addr : "",
        phoneNumber: (type === "edit") ? item.item?.phoneNumber : "",
        email: (type === "edit") ? item.item?.email : "",
        userName: (type === "edit") ? item.item?.userName : "",
        gender: (type === "edit") ? item.item?.gender : "",
        uni: (type === "edit") ? item.item?.uni : "",
        degree: (type === "edit") ? item.item?.degree : "",
        supervisedBy: (type === "edit") ? item.item?.supervisedBy.map((entry)=>entry._id) : [],
    })
    
    const [create] = useCreateMutation(useCreateHPMutation);
    const [update] = useAsyncMutation(useUpdateHPMutation);
    const navigate = useNavigate();

    const doctorData = useGetAllDoctorsQuery();
    const errors = [{ isError: doctorData.isError, error: doctorData.error }];
    useErrors(errors);

    const doctors = doctorData?.data?.data || [];

    const doctorOptions = doctors?.map(doctor => ({
        label: doctor.name,
        value: doctor._id, 
    }))

    const handleFieldChange = (index,  value) => {
        setFormData(prev =>{
            const updated = [...prev.supervisedBy];
            updated[index] = value;
            return {...prev, supervisedBy:updated};
        })
    }

    const addNewField = () => {
        setFormData(prev => ({
            ...prev, 
            supervisedBy : [...prev.supervisedBy,""],
        }));
    }

    const removeField = (index) => {
        setFormData(prev => {
            const updated = prev.supervisedBy.filter((_,i) => i!==index );
            return {...prev,supervisedBy : updated};
        });
    }

    const handleFormChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validDoctor = formData?.supervisedBy?.filter(data=>data!=="")
        const newFormData = {
            ...formData,
            name: formData.firstName + " " + formData.lastName,
            addr: formData.address,
            id: (type === "new") ? "" : item?.item._id,
            supervisedBy: validDoctor
        }
        if (type === "new") create("Creating treatment...", newFormData, navigate);
        else update("Updating treatment...", newFormData, navigate);
    }

    return (
        <div className={classes.formWrapper}>
            <div className={classes.formHeading}>
                <h1>{type === "new" ? "ADD HEALTH PROFESSIONAL" : "EDIT HEALTH PROFESSIONAL"}</h1>
            </div>
            <form>
                <div className={classes.formAbout}>
                    <h3>ABOUT</h3>
                    <div className={classes.formAboutInputs}>
                        <div className={classes.inputImage}>
                            <div className={classes.imagee}></div>
                        </div>
                        <div className={classes.inputAbout}>
                            <FormInput
                                type="text"
                                id="DfirstName"
                                name="firstName"
                                label="First Name"
                                value={formData.firstName}
                                onChange={handleFormChange}
                            />
                            <FormInput
                                type="text"
                                id="DlastName"
                                name="lastName"
                                label="Last Name"
                                value={formData.lastName}
                                onChange={handleFormChange}
                            />
                            <FormInput
                                type="text"
                                id="Dgender"
                                name="gender"
                                label="Gender"
                                value={formData.gender}
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={classes.formAbout}>
                    <h3>EDUCATION</h3>
                    <div className={classes.formFlex}>
                        <FormInput
                            type="text"
                            id="Duni"
                            name="uni"
                            label="University"
                            value={formData.uni}
                            onChange={handleFormChange}
                        />
                        <FormInput
                            type="text"
                            id="Ddegree"
                            name="degree"
                            label="Degree"
                            value={formData.degree}
                            onChange={handleFormChange}
                        />
                    </div>
                </div>

                <div className={classes.formAbout}>
                    <h3>CONTACTS</h3>
                    <div className={classes.formFlex}>
                        <FormInput
                            type="email"
                            id="Demail"
                            name="email"
                            label="E-mail"
                            value={formData.email}
                            onChange={handleFormChange}
                        />
                        <FormInput
                            type="number"
                            id="DphoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleFormChange}
                        />
                    </div>
                    <FormInput
                        type="text"
                        id="Dtext"
                        name="address"
                        label="Address"
                        value={formData.address}
                        onChange={handleFormChange}
                    />
                </div>

                <div className={classes.formAbout}>
                    <h3>SUPERVISION</h3>
                    {formData.supervisedBy?.map((entry, index) => (
                        <>
                            <div key={entry._id} className={classes.divFlex}>
                                <FormSelect
                                    label={`Doctor ${index + 1}`}
                                    name={`doctor-${index}`}
                                    value={entry.name}
                                    onChange={(e) => handleFieldChange(index, e.target.value)}
                                    options={doctorOptions}
                                    defaultValue={doctors?.find((doc)=>doc._id===entry)?.name || "Choose Doctor"}
                                    defaultValueID={entry?._id}
                                />
                                <button
                                    className={`${classes.chooseInput} ${classes.rmvBtn}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeField(index);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                        </>
                    ))}
                    <button
                        className={`${classes.chooseInput} ${classes.presBtn}`}
                        onClick={(e)=>{
                            e.preventDefault();
                            addNewField();
                        }}
                    >
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </button>
                </div>

                <div className={classes.formSubmit}>
                    <FormSubmit
                        handleSubmit={handleSubmit}
                    > Submit </FormSubmit>
                </div>
            </form>
        </div>
    );
}

export { HPForm }