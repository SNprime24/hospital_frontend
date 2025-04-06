import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreatePatientMutation,  useUpdatePatientMutation } from '../../redux/api/api';
import { useCreateMutation, useAsyncMutation } from '../../hooks/hooks';

import { FormInput, FormSubmit } from './FormInput';

import classes from "./DEOFormsDesign.module.css";

function PatientForm({ type, item }) {
    const [formData, setFormData] = useState({
        firstName: (type === "edit") ? item.item?.name.split(' ')[0] : "",
        lastName: (type === "edit") ? item.item?.name.split(' ')[1] : "",
        guardianFirstName: (type === "edit") ? item.item?.gname.split(' ')[0] : "",
        guardianLastName: (type === "edit") ? item.item?.gname.split(' ')[1] : "",
        gender: (type === "edit") ? item.item?.gender : "",
        phoneNumber: (type === "edit") ? item.item?.phoneNumber : null,
        guardianPhoneNumber: (type === "edit") ? item.item?.gPhoneNumber : null,
        address: (type === "edit") ? item.item?.addr : ""
    })

    const [create] = useCreateMutation(useCreatePatientMutation);
    const [update] = useAsyncMutation(useUpdatePatientMutation);
    const navigate = useNavigate();

    const handleFormChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData(prev => ({
            ...prev,
            name: prev.firstName + " " + prev.lastName,
            guardian_name: prev.guardianFirstName + " " + prev.guardianLastName,
            guardian_phoneNo: prev.guardianPhoneNumber,
            addr: prev.address,
            id: (type === "new") ? "" : item?.item._id
        }));
        if (type === "new") create("Creating patient...", formData, navigate);
        else update("Updating patient...", formData, navigate);
        console.log(formData);
    }

    return (
        <div className={classes.formWrapper}>
            <div className={classes.formHeading}>
                <h1>{type === "new" ? "ADD PATIENT" : "EDIT PATIENT"}</h1>
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
                    <h3>GUARDIAN DETAILS</h3>
                    <div className={classes.formFlex}>
                        <FormInput
                            type="text"
                            id="DguardianFirstName"
                            name="guardianFirstName"
                            label="Guardian First Name"
                            value={formData.guardianFirstName}
                            onChange={handleFormChange}
                        />
                        <FormInput
                            type="text"
                            id="DguardianLastName"
                            name="guardianLastName"
                            label="Guardian Last Name"
                            value={formData.guardianLastName}
                            onChange={handleFormChange}
                        />
                        <FormInput
                            type="tel"
                            id="DguardianPhoneNumber"
                            name="guardianPhoneNumber"
                            label="Guardian Phone Number"
                            value={formData.guardianPhoneNumber}
                            onChange={handleFormChange}
                        />
                    </div>
                </div>

                <div className={classes.formAbout}>
                    <h3>PATIENTS CONTACTS</h3>
                    <div className={classes.formFlex}>
                        <FormInput
                            type="text"
                            id="Dtext"
                            name="address"
                            label="Address"
                            value={formData.address}
                            onChange={handleFormChange}
                        />
                        <FormInput
                            type="tel"
                            id="DphoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleFormChange}
                        />
                    </div>
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

export { PatientForm };