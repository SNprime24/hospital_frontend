import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from "./DEOFormsDesign.module.css";

import { FormInput, FormSelect, FormSubmit } from './FormInput';
import { shiftList } from '../Lists/lists';

import { useAsyncMutation, useCreateMutation } from '../../hooks/hooks';
import { useCreateNurseMutation, useUpdateNurseMutation } from '../../redux/api/api';


function NurseForm({ type, item }) {
    const [formData, setFormData] = useState({
        firstName: (type === "edit") ? item.item?.name.split(' ')[0] : "",
        lastName: (type === "edit") ? item.item?.name.split(' ')[1] : "",
        gender: (type === "edit") ? item.item?.gender : "",
        qualification: (type === "edit") ? item.item?.qualification : "",
        email: (type === "edit") ? item.item?.email : "",
        phoneNumber: (type === "edit") ? item.item?.phoneNumber : null,
        address: (type === "edit") ? item.item?.addr : "",
        shift: (type === "edit") ? item.item?.shift : "",
    })

    const [create] = useCreateMutation(useCreateNurseMutation);
    const [update] = useAsyncMutation(useUpdateNurseMutation);
    const navigate = useNavigate();

    const handleFormChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData(prev => ({
            ...prev,
            name: prev.firstName + " " + prev.lastName,
            addr: prev.address,
            id: (type === "new") ? "" : item.item?._id
        }));
        if (type === "new") create("Creating nurse...", formData, navigate);
        else update("Updating nurse...", formData, navigate);
        console.log(formData);
    }

    return (
        <div className={classes.formWrapper}>
            <div className={classes.formHeading}>
                <h1>{type === "new" ? "ADD NURSE" : "EDIT NURSE"}</h1>
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
                                id="NirstName"
                                name="firstName"
                                label="First Name"
                                value={formData.firstName}
                                onChange={handleFormChange}
                            />
                            <FormInput
                                type="text"
                                id="NlastName"
                                name="lastName"
                                label="Last Name"
                                value={formData.lastName}
                                onChange={handleFormChange}
                            />
                            <FormInput
                                type="text"
                                id="Ngender"
                                name="gender"
                                label="Gender"
                                value={formData.gender}
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={classes.formAbout}>
                    <h3>NURSE QUALIFICATION</h3>
                    <div className={classes.formFlex}>
                        <FormInput
                            type="text"
                            id="Nqualification"
                            name="qualification"
                            label="Qualification"
                            value={formData.qualification}
                            onChange={handleFormChange}
                        />
                    </div>
                </div>

                <div className={classes.formAbout}>
                    <h3>NURSE CONTACTS</h3>
                    <div className={classes.formFlex}>
                        <FormInput
                            type="email"
                            id="Nemail"
                            name="email"
                            label="E-mail"
                            value={formData.email}
                            onChange={handleFormChange}
                        />
                        <FormInput
                            type="number"
                            id="NphoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleFormChange}
                        />
                    </div>
                    <FormInput
                        type="text"
                        id="Naddress"
                        name="address"
                        label="Address"
                        value={formData.address}
                        onChange={handleFormChange}
                    />
                </div>

                <div className={classes.formAbout}>
                    <h3>NURSE SHIFT</h3>
                    <div className={classes.formFlex}>
                        <FormSelect
                            id="Nshift"
                            name="shift"
                            label="Shift"
                            value={formData.shift}
                            onChange={handleFormChange}
                            options={shiftList}
                            defaultValue={(formData.shift) ? formData.shift : "Choose a shift"}
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

export { NurseForm };