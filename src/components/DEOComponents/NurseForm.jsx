import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { FormInput, FormSubmit } from './FormInput';

import classes from "./DEOFormsDesign.module.css";
import { useCreateMutation } from '../../hooks/hooks';
import { useCreateNurseMutation } from '../../redux/api/api';


function NurseForm({type = "add"}) {
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        gender : "",
        qualification : "",
        email : "",
        phoneNumber : null,
        address : "",
        shift : "",
    })
    const [create] = useCreateMutation(useCreateNurseMutation);
    const navigate = useNavigate();

    const handleFormChange = (e) => setFormData((prev)=>({...prev, [e.target.name] : e.target.value}));
    console.log(formData);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData(prev => ({
            ...prev,
            name: prev.firstName + " " + prev.lastName,
            addr: prev.address
        }));
        create("Creating nurse...", formData, navigate);
        console.log(formData);
    }

    return(
        <div className={classes.formWrapper}>
            <div className={classes.formHeading}>
                <h1>{type==="add" ? "ADD NURSE" : "EDIT NURSE"}</h1>
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
                                type = "text"
                                id = "NirstName"
                                name = "firstName"
                                label = "First Name"
                                value = {formData.firstName}
                                onChange={handleFormChange}
                            />
                            <FormInput
                                type = "text"
                                id = "NlastName"
                                name = "lastName"
                                label = "Last Name"
                                value = {formData.lastName}
                                onChange={handleFormChange}
                            />
                            <FormInput
                                type = "text"
                                id = "Ngender"
                                name = "gender"
                                label = "Gender"
                                value = {formData.gender}
                                onChange={handleFormChange}
                            />
                        </div>       
                    </div>             
                </div>
                <div className={classes.formAbout}>
                    <h3>NURSE QUALIFICATION</h3>
                    <div className={classes.formFlex}>
                        <FormInput
                            type = "text"
                            id = "Nqualification"
                            name = "qualification"
                            label = "Qualification"
                            value = {formData.qualification}
                            onChange = {handleFormChange}
                        />
                    </div>
                </div>

                <div className={classes.formAbout}>
                    <h3>NURSE CONTACTS</h3>
                    <div className={classes.formFlex}>
                        <FormInput
                            type = "email"
                            id = "Nemail"
                            name = "email"
                            label = "E-mail"
                            value = {formData.email}
                            onChange={handleFormChange}
                        />
                        <FormInput
                            type = "number"
                            id = "NphoneNumber"
                            name = "phoneNumber"
                            label = "Phone Number"
                            value = {formData.phoneNumber}
                            onChange={handleFormChange}
                        />
                    </div>
                    <FormInput
                        type = "text"
                        id = "Naddress"
                        name = "address"
                        label = "Address"
                        value = {formData.address}
                        onChange={handleFormChange}
                    />
                </div>

                <div className={classes.formAbout}>
                    <h3>NURSE SHIFT</h3>
                    <div className={classes.formFlex}>
                        <FormInput
                            type = "text"
                            id = "Nshift"
                            name = "shift"
                            label = "Shift"
                            value = {formData.shift}
                            onChange={handleFormChange}
                        />
                    </div>
                </div>

                <div className={classes.formSubmit}>
                    <FormSubmit 
                        handleSubmit = {handleSubmit}
                    > Submit </FormSubmit>
                </div>
            </form>
        </div>
    );
}

export {NurseForm};