import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from "./DEOFormsDesign.module.css";

import { FormInput, FormSubmit } from './FormInput';

import { useCreatePatientMutation,  useUpdatePatientMutation } from '../../redux/api/api';
import { useCreateMutation, useAsyncMutation } from '../../hooks/hooks';
import { useSelector } from 'react-redux';

function PatientForm({ type, item }) {
    const [formData, setFormData] = useState({
        firstName: (type === "edit") ? item.item?.name.split(' ')[0] : "",
        lastName: (type === "edit") ? item.item?.name.split(' ')[1] : "",
        guardianFirstName: (type === "edit") ? item.item?.gname.split(' ')[0] : "",
        guardianLastName: (type === "edit") ? item.item?.gname.split(' ')[1] : "",
        gender: (type === "edit") ? item.item?.gender : "",
        phoneNumber: (type === "edit") ? item.item?.phoneNumber : null,
        guardianPhoneNumber: (type === "edit") ? item.item?.gPhoneNo : null,
        address: (type === "edit") ? item.item?.addr : "",
        email: (type === "edit") ? item.item?.email : "",
        age: (type === "edit") ? item.item?.age : 0
    })

    const role = useSelector((state) => state.auth.user.role);

    const [create] = useCreateMutation(useCreatePatientMutation);
    const [update] = useAsyncMutation(useUpdatePatientMutation);
    const navigate = useNavigate();

    const handleFormChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFormData = {
            ...formData,
            name: formData.firstName + " " + formData.lastName,
            gname: formData.guardianFirstName + " " + formData.guardianLastName,
            gPhoneNo: formData.guardianPhoneNumber,
            addr: formData.address,
            id: (type === "new") ? "" : item?.item._id
        }
        if (type === "new") await create("Creating patient...", newFormData, navigate, role);
        else await update("Updating patient...", newFormData, navigate, role);
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
                            <div className={classes.formFlex}>
                                <FormInput
                                    type="text"
                                    id="Dgender"
                                    name="gender"
                                    label="Gender"
                                    value={formData.gender}
                                    onChange={handleFormChange}
                                />
                                <FormInput
                                    type="number"
                                    id="Dage"
                                    name="age"
                                    label="Age"
                                    value={formData.age}
                                    onChange={handleFormChange}
                                />
                            </div>
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
                    <div className={classes.formFlex}>
                        <FormInput
                            type="email"
                            id="Demail"
                            name="email"
                            label="Email"
                            value={formData.email}
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