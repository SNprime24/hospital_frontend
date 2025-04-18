import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from "./DEOFormsDesign.module.css";

import { FormInput, FormSelect, FormSubmit } from './FormInput';
import { departmentList, designationList, hsRoleList, shiftList } from '../Lists/lists';

import { useAsyncMutation, useCreateMutation } from '../../hooks/hooks';
import { useCreateHSMutation, useUpdateHSMutation } from '../../redux/api/api';


function HSForm({ type, item }) {
    const [formData, setFormData] = useState({
        firstName: (type === "edit") ? item.item?.name.split(' ')[0] : "",
        lastName: (type === "edit") ? item.item?.name.split(' ')[1] : "",
        gender: (type === "edit") ? item.item?.gender : "",
        address: (type === "edit") ? item.item?.addr : "",
        phoneNumber: (type === "edit") ? item.item?.phoneNumber : "",
        email: (type === "edit") ? item.item?.email : "",
        role: (type === "edit") ? item.item?.role : "",
        department: (type === "edit") ? item.item?.department : "",
        designation: (type === "edit") ? item.item?.designation : "",
        shift: (type === "edit") ? item.item?.shift : ""
    })
    
    const [create] = useCreateMutation(useCreateHSMutation);
    const [update] = useAsyncMutation(useUpdateHSMutation);
    const navigate = useNavigate();

    const handleFormChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFormData = {
            ...formData,
            name: formData.firstName + " " + formData.lastName,
            addr: formData.address,
            id: (type === "new") ? "" : item?.item._id
        }
        const role = formData.role;
        if (type === "new") create("Creating hospital staff...", newFormData, navigate, role);
        else update("Updating hospital staff...", newFormData, navigate, role);
    }

    return (
        <div className={classes.formWrapper}>
            <div className={classes.formHeading}>
                <h1>{type === "new" ? "ADD HEALTH STAFF" : "EDIT HEALTH STAFF"}</h1>
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

                
                <div className={classes.formFlex}>
                    <div className={classes.formAbout}>
                        <h3>DEPARTMENT</h3>
                        <div className={classes.formFlex}>
                            <FormSelect
                                id="Ddepartment"
                                name="department"
                                defaultValue="Select a Department"
                                label="Department"
                                value={formData.department}
                                onChange={handleFormChange}
                                options={departmentList}
                            />
                        </div>
                    </div>
                    <div className={classes.formAbout}>
                        <h3>DESIGNATION</h3>
                        <div className={classes.formFlex}>
                            <FormSelect
                                id="Ddesignation"
                                name="designation"
                                defaultValue="Select a Designation"
                                label="Designation"
                                value={formData.designation}
                                onChange={handleFormChange}
                                options={designationList}
                            />
                        </div>
                    </div>
                </div>

                <div className={classes.formFlex}>
                    <div className={classes.formAbout}>
                        <h3>ROLE</h3>
                        <div className={classes.formFlex}>
                            <FormSelect
                                id="Drole"
                                name="role"
                                defaultValue="Select a Role"
                                label="role"
                                value={formData.role}
                                onChange={handleFormChange}
                                options={hsRoleList}
                            />
                        </div>
                    </div>
                    <div className={classes.formAbout}>
                        <h3>SHIFT</h3>
                        <div className={classes.formFlex}>
                            <FormSelect
                                id="Dshift"
                                name="shift"
                                defaultValue="Select a Shift"
                                label="Shift"
                                value={formData.shift}
                                onChange={handleFormChange}
                                options={shiftList}
                            />
                        </div>
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

export { HSForm }